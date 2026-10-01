package com.empresa.portal_solicitacoes.dtos;

public record DashboardStatusDTO(
  long totalSolicitacoes,
  long abertos,
  long emAtendimento,
  long concluidos
){}


