package com.empresa.portal_solicitacoes.repositories;

import com.empresa.portal_solicitacoes.models.Categoria;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
  Optional<Categoria> findByNomeIgnoreCase(String nome);
}
