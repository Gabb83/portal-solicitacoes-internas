package com.empresa.portal_solicitacoes.controllers;

import java.time.LocalDate;
import java.util.Map;

import com.empresa.portal_solicitacoes.dtos.SolicitacaoResponseDTO;
import com.empresa.portal_solicitacoes.dtos.SolicitacaoRequestDTO;
import com.empresa.portal_solicitacoes.services.SolicitacaoService;
import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {
  
  private final SolicitacaoService solicitacaoService;

  public SolicitacaoController(SolicitacaoService solicitacaoService) {
    this.solicitacaoService = solicitacaoService;
  }
  @GetMapping 
  public ResponseEntity<Page<SolicitacaoResponseDTO>> listarComFiltros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) StatusSolicitacao status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim,
            @PageableDefault(size = 10, sort = "dataCriacao") Pageable pageable) {

        Page<SolicitacaoResponseDTO> resultado = solicitacaoService
                .buscarComFiltros(titulo, categoriaId, status, dataInicio, dataFim, pageable);
        return ResponseEntity.ok(resultado);
    }

  @PostMapping
  public ResponseEntity<SolicitacaoResponseDTO> criar(@RequestBody SolicitacaoRequestDTO dto) {
      SolicitacaoResponseDTO nova = solicitacaoService.criar(dto);
      return ResponseEntity.status(HttpStatus.CREATED).body(nova);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SolicitacaoResponseDTO> buscarPorId(@PathVariable Long id) {
      return ResponseEntity.ok(solicitacaoService.buscarPorId(id));
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<SolicitacaoResponseDTO> atualizarStatus(
          @PathVariable Long id,
          @RequestBody Map<String, String> body) {
      
      StatusSolicitacao novoStatus = StatusSolicitacao.valueOf(body.get("status").toUpperCase());
      SolicitacaoResponseDTO atualizada = solicitacaoService.atualizarStatus(id, novoStatus);
      return ResponseEntity.ok(atualizada);
  }

  // 5. Rota DELETE
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletar(@PathVariable Long id) {
      solicitacaoService.deletar(id);
      return ResponseEntity.noContent().build();
  }
}