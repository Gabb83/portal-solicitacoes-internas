package com.empresa.portal_solicitacoes.controllers;

import java.util.List;

import com.empresa.portal_solicitacoes.models.Categoria;
import com.empresa.portal_solicitacoes.services.CategoriaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController 
@RequestMapping("/api/categorias")
public class CategoriaController {
  private final CategoriaService categoriaService;

  public CategoriaController(CategoriaService categoriaService) {
    this.categoriaService = categoriaService;
  }

  @GetMapping
  public ResponseEntity<List<Categoria>> listarTodas() {
    return ResponseEntity.ok(categoriaService.buscarTodas());
  }
}
