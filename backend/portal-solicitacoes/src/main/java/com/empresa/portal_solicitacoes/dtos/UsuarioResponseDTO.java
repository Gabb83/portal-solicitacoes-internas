package com.empresa.portal_solicitacoes.dtos;

import com.empresa.portal_solicitacoes.models.Usuario;
import java.time.LocalDateTime;

public record UsuarioResponseDTO (
  Long id, String nome, String email, LocalDateTime dataCriacao
) {
  public static UsuarioResponseDTO fromEntity(Usuario usuario) {
    return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getDataCriacao());
  }
}
