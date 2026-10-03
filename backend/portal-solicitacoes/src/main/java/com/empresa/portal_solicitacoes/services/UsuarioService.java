package com.empresa.portal_solicitacoes.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.portal_solicitacoes.dtos.UsuarioCreateDTO;
import com.empresa.portal_solicitacoes.dtos.UsuarioResponseDTO;
import com.empresa.portal_solicitacoes.dtos.UsuarioUpdateDTO;
import com.empresa.portal_solicitacoes.exceptions.ResourceNotFoundException;
import com.empresa.portal_solicitacoes.models.Usuario;
import com.empresa.portal_solicitacoes.repositories.UsuarioRepository;

@Service 
public class UsuarioService {
  private final PasswordEncoder passwordEncoder;
  private final UsuarioRepository usuarioRepository;

  public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional()
  public UsuarioResponseDTO criarUsuario(UsuarioCreateDTO dto) {
    if(usuarioRepository.existsByEmail(dto.email())) {
      throw new IllegalArgumentException("Já existe um usuário cadastrado com este email");
    }

    Usuario usuario = new Usuario();
    usuario.setNome(dto.nome());
    usuario.setEmail(dto.email());
    usuario.setSenha(passwordEncoder.encode(dto.senha()));

    Usuario usuarioSalvo = usuarioRepository.save(usuario);
    return UsuarioResponseDTO.fromEntity(usuarioSalvo);
  }

  @Transactional(readOnly = true)
  public List<UsuarioResponseDTO> listarTodos() {
      return usuarioRepository.findAll()
              .stream()
              .map(UsuarioResponseDTO::fromEntity)
              .toList();
  }

  @Transactional
  public UsuarioResponseDTO atualizar(Long id, UsuarioUpdateDTO dto) {

      Usuario usuario = usuarioRepository.findById(id)
              .orElseThrow(() ->
                  new ResourceNotFoundException(
                      "Usuário não encontrado com o ID: " + id
                  )
              );

      usuario.setNome(dto.nome());
      usuario.setEmail(dto.email());

      Usuario atualizado = usuarioRepository.save(usuario);

      return UsuarioResponseDTO.fromEntity(atualizado);
  }

  @Transactional(readOnly = true)
  public UsuarioResponseDTO buscarId(Long id) {
    Usuario usuario = usuarioRepository.findById(id).orElseThrow(() ->
      new ResourceNotFoundException(
        "Usuário não encontrado com o id" + id
      )
    );

    return UsuarioResponseDTO.fromEntity(usuario);
  } 

  @Transactional
    public void deletar(Long id) {
      Usuario usuario = usuarioRepository.findById(id)
              .orElseThrow(() -> new ResourceNotFoundException(
                      "Usuário não encontrado com o ID: " + id
              ));

      usuarioRepository.delete(usuario);
    }
}
