package com.empresa.portal_solicitacoes.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SolicitacaoRequestDTO (
  @NotBlank (message = "O título é obrigatório")
  @Size (max = 255, message = "O título deve ter no máximo 255 caracteres")
  String titulo,

  @NotBlank(message = "A descrição é obrigatória")
  String descricao,

  @NotNull (message = "A categoria é obrigatória")
  Long categoriaId

){}
