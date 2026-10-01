package com.empresa.portal_solicitacoes.exceptions;

public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String mensagem) {
    super(mensagem);
  }
}
