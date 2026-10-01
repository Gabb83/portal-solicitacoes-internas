package com.empresa.portal_solicitacoes.services;

import com.empresa.portal_solicitacoes.models.Categoria;
import com.empresa.portal_solicitacoes.repositories.CategoriaRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service 
public class CategoriaService {
  private final CategoriaRepository categoriaRepository;

  public CategoriaService(CategoriaRepository categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  @Transactional(readOnly = true)
  public List<Categoria> buscarTodas() {
    return categoriaRepository.findAll();
  } 
}
