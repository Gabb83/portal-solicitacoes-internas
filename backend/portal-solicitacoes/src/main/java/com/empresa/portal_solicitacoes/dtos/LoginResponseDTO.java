package com.empresa.portal_solicitacoes.dtos;

public record LoginResponseDTO (
  Long id, String email, String nome, String token
) {}
