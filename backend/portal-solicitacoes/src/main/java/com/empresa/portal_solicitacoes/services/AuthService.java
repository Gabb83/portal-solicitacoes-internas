package com.empresa.portal_solicitacoes.services;

import com.empresa.portal_solicitacoes.repositories.UsuarioRepository;
import com.empresa.portal_solicitacoes.models.Usuario;
import com.empresa.portal_solicitacoes.dtos.LoginRequestDTO;
import com.empresa.portal_solicitacoes.dtos.LoginResponseDTO;
import com.empresa.portal_solicitacoes.exceptions.ResourceNotFoundException;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service 
public class AuthService {
  private final UsuarioRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @Transactional(readOnly = true)
  public LoginResponseDTO autenticar(LoginRequestDTO dto) {
    Usuario usuario = usuarioRepository.findByEmail(dto.email()).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o e-mail: " + dto.email()));

      if(!passwordEncoder.matches(dto.senha(), usuario.getSenha())) {
        throw new IllegalArgumentException("Senha incorreta");
      }

      String token = jwtService.gerarToken(usuario);

      return new LoginResponseDTO(
        usuario.getId(),
        usuario.getEmail(),
        usuario.getNome(),
        token
      );
  }
}
