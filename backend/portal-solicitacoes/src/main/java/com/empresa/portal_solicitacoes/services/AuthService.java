package com.empresa.portal_solicitacoes.services;

import com.empresa.portal_solicitacoes.repositories.UsuarioRepository;
import com.empresa.portal_solicitacoes.models.Usuario;
import com.empresa.portal_solicitacoes.dtos.LoginRequestDTO;
import com.empresa.portal_solicitacoes.dtos.LoginResponseDTO;
import com.empresa.portal_solicitacoes.exceptions.ResourceNotFoundException;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service 
public class AuthService {
  private final UsuarioRepository usuarioRepository;

  public AuthService(UsuarioRepository usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  @Transactional(readOnly = true)
  public LoginResponseDTO autenticar(LoginRequestDTO dto) {
    Usuario usuario = usuarioRepository.findByEmail(dto.email()).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o e-mail: " + dto.email()));

      if (!usuario.getSenha().equals(dto.senha())) {
        throw new IllegalArgumentException("Senha incorreta");
      }

      return new LoginResponseDTO(
        usuario.getId(),
        usuario.getNome(),
        usuario.getEmail(),
        "session-token-" + usuario.getId()
      );
  }
}
