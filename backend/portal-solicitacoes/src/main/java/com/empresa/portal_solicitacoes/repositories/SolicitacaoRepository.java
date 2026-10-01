package com.empresa.portal_solicitacoes.repositories;

import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;
import com.empresa.portal_solicitacoes.models.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long>, JpaSpecificationExecutor<Solicitacao> {
  long countByStatus(StatusSolicitacao status);
}
