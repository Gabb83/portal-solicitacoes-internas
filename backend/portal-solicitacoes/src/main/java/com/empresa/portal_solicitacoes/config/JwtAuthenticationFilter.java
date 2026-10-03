package com.empresa.portal_solicitacoes.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.empresa.portal_solicitacoes.services.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtAuthenticationFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    System.out.println(
        "🔥 JWT FILTER: " +
        request.getMethod() +
        " " +
        request.getRequestURI()
    );

    String authorization = request.getHeader("Authorization");

    System.out.println(
        "🔐 AUTHORIZATION: " + authorization
    );

    if (authorization == null || !authorization.startsWith("Bearer ")) {

        System.out.println("❌ JWT não encontrado");

        filterChain.doFilter(request, response);
        return;
    }

    String token = authorization.substring(7);

    try {

        Jws<Claims> claims = jwtService.validarToken(token);

        String usuarioId = claims.getPayload().getSubject();

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        usuarioId,
                        null,
                        java.util.Collections.emptyList()
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        System.out.println(
            "✅ JWT VALIDADO - USUARIO: " + usuarioId
        );

    } catch (Exception e) {

        System.out.println(
            "❌ JWT INVÁLIDO: " + e.getMessage()
        );

        SecurityContextHolder.clearContext();
    }

    System.out.println(
        "🔎 AUTH: " +
        SecurityContextHolder.getContext().getAuthentication()
    );

    filterChain.doFilter(request, response);
}
}
