package com.empresa.portal_solicitacoes.repositories;

import com.empresa.portal_solicitacoes.models.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Optional<Usuario> findByEmail(String email);
  boolean existsByEmail(String email);  
}
