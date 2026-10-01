package com.empresa.portal_solicitacoes.dtos;

import com.empresa.portal_solicitacoes.models.Usuario;
import java.time.LocalDateTime;

public record UsuarioReponseDTO (
  Long id, String nome, String email, LocalDateTime dataCriacao
) {
  public static UsuarioReponseDTO fromEntity(Usuario usuario) {
    return new UsuarioReponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getDataCriacao());
  }
}
