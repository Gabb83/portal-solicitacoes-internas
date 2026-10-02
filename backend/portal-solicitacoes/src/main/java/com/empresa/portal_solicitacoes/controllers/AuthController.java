package com.empresa.portal_solicitacoes.controllers;

import com.empresa.portal_solicitacoes.services.AuthService;
import com.empresa.portal_solicitacoes.dtos.LoginRequestDTO;
import com.empresa.portal_solicitacoes.dtos.LoginResponseDTO;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO>login(@RequestBody @Valid LoginRequestDTO dto) {
    LoginResponseDTO response = authService.autenticar(dto);
    return ResponseEntity.ok(response);
  }
}
