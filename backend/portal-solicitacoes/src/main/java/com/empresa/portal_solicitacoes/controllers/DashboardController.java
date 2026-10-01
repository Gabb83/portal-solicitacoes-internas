package com.empresa.portal_solicitacoes.controllers;

import com.empresa.portal_solicitacoes.dtos.DashboardStatusDTO;
import com.empresa.portal_solicitacoes.services.SolicitacaoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
  private final SolicitacaoService solicitacaoService;

  public DashboardController(SolicitacaoService solicitacaoService) {
    this.solicitacaoService = solicitacaoService;
  }

  @GetMapping("/stats")
  public ResponseEntity<DashboardStatusDTO> obterEstatisticas() {
    return ResponseEntity.ok(solicitacaoService.obterEstatisticasDashboard());
  }
}
