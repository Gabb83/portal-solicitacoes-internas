package com.empresa.portal_solicitacoes.dtos;

import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;
import com.empresa.portal_solicitacoes.models.Solicitacao;

import java.time.LocalDateTime;

public record SolicitacaoResponseDTO (
  Long id, String titulo, String descricao, StatusSolicitacao status, Long categoriaId, String categoriaNome, Long usuarioId, String usuarioNome, LocalDateTime dataCriacao, LocalDateTime dataAtualizacao
) {
  public static SolicitacaoResponseDTO fromEntity(Solicitacao s) {
    return new SolicitacaoResponseDTO(s.getId(), s.getTitulo(), s.getDescricao(), s.getStatus(), s.getCategoria().getId(), s.getCategoria().getNome(), s.getUsuario().getId(), s.getUsuario().getNome(), s.getDataCriacao(), s.getDataAtualizacao()
    );
  }
}
