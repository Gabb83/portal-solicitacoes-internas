package com.empresa.portal_solicitacoes.repositories;

import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;
import com.empresa.portal_solicitacoes.models.Solicitacao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long>, JpaSpecificationExecutor<Solicitacao> {
  long countByStatus(StatusSolicitacao status);

  @Query("""
      SELECT s.status, COUNT(s)
      FROM Solicitacao s
      GROUP BY s.status
  """)
  List<Object[]> contarPorStatus();

  @Query("""
    SELECT s.categoria.nome, COUNT(s)
    FROM Solicitacao s
    GROUP BY s.categoria.nome
    ORDER BY s.categoria.nome   
  """)
  List<Object[]> contarPorCategoria();
}
