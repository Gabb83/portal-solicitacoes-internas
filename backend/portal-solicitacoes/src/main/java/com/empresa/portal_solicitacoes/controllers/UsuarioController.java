package com.empresa.portal_solicitacoes.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.portal_solicitacoes.dtos.UsuarioCreateDTO;
import com.empresa.portal_solicitacoes.dtos.UsuarioResponseDTO;
import com.empresa.portal_solicitacoes.services.UsuarioService;

@RestController 
@RequestMapping("api/usuarios")
public class UsuarioController {
  private final UsuarioService usuarioService;

  public UsuarioController(UsuarioService usuarioService) {
    this.usuarioService = usuarioService;
  }

  @PostMapping
  public ResponseEntity<UsuarioResponseDTO> criar(@RequestBody UsuarioCreateDTO dto) {
    return ResponseEntity.ok(usuarioService.criarUsuario(dto));
  }

  @GetMapping
  public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
    return ResponseEntity.ok(usuarioService.listarTodos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<UsuarioResponseDTO> buscarId(@PathVariable Long id) {
    return ResponseEntity.ok(usuarioService.buscarId(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletar(@PathVariable Long id) {
    usuarioService.deletar(id);
    return ResponseEntity.noContent().build();
  }
}