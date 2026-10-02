package com.empresa.portal_solicitacoes.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioCreateDTO (
  @NotBlank(message = "O nome é obrigatório")
  String nome,

  @NotBlank(message = "O email é obrigatório")
  @Email(message = "Email inválido")
  String email,

  @NotBlank(message = "A senha é obrigatória")
  String senha
){}
