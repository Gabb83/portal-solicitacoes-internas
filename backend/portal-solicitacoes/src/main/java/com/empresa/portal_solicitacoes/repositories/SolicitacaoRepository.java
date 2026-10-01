
package com.empresa.portal_solicitacoes.repositories;
import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;
import com.empresa.portal_solicitacoes.models.Solicitacao;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
  @Query("SELECT s FROM Solicitacao s WHERE " +
      "(:titulo IS NULL OR LOWER(s.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) AND " +
      "(:categoriaId IS NULL OR s.categoria.id = :categoriaId) AND " +
      "(:status IS NULL OR s.status = :status) AND " +
      "(:dataInicio IS NULL OR s.dataCriacao >= :dataInicio) AND " +
      "(:dataFim IS NULL OR s.dataCriacao <= :dataFim)")

  Page<Solicitacao> buscarComFiltros(
    @Param("titulo") String titulo,
    @Param("categoria_id") Long categoriaId,
    @Param("status") StatusSolicitacao status,
    @Param("dataInicio") LocalDateTime dataInicio,
    @Param("dataFim") LocalDateTime dataFim,
    Pageable pageable
  );

  long countByStatus(StatusSolicitacao status);
}

