package com.empresa.portal_solicitacoes.dtos;

import java.util.Map;

public record DashboardStatusDTO(
  long totalSolicitacoes,
  long abertos,
  long emAtendimento,
  long concluidos,

  Map<String, Long> porStatus,
  Map<String, Long> porCategoria
){}
