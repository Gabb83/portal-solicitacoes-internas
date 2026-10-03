package com.empresa.portal_solicitacoes.services;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.empresa.portal_solicitacoes.models.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service 
public class JwtService {
  private final SecretKey secretKey;
  private final long expiration;

  public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expiration = expiration;
  }

  public String gerarToken(Usuario usuario) {
    Date agora = new Date();
    Date expiracao = new Date(agora.getTime() + expiration);

    return Jwts.builder()
      .subject(usuario.getId().toString())
      .claim("email", usuario.getEmail())
      .claim("nome", usuario.getNome())
      .issuedAt(agora)
      .expiration(expiracao)
      .signWith(secretKey)
      .compact();
  }

  public Jws<Claims> validarToken(String token) {
    return Jwts.parser()
      .verifyWith(secretKey)
      .build()
      .parseSignedClaims(token);
  }
}
