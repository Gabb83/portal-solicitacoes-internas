package com.empresa.portal_solicitacoes.models;

import java.time.LocalDateTime;

import com.empresa.portal_solicitacoes.enums.StatusSolicitacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Table(name = "solicitacoes")
@Data 
@NoArgsConstructor 
@AllArgsConstructor 

public class Solicitacao {
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id; 

  @Column(nullable = false, length = 255)
  private String titulo;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String descricao;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 30)
  private StatusSolicitacao status = StatusSolicitacao.ABERTO;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "categoria_id", nullable = false)
  private Categoria categoria;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario usuario;

  @Column(name = "data_criacao", updatable = false)
  private LocalDateTime dataCriacao;

  @Column(name = "data_atualizacao")
  private LocalDateTime dataAtualizacao;

  @PrePersist
  protected void onCreate() {
    this.dataCriacao = LocalDateTime.now();
    this.dataAtualizacao = LocalDateTime.now();
  }

  @PrePersist 
  protected void onUpdate() {
    this.dataAtualizacao = LocalDateTime.now();
  }
}
