package com.empresa.portal_solicitacoes.models;

import jakarta.persistence.*;
import lombok.*;

@Entity 
@Table 
@Data 
@NoArgsConstructor 
@AllArgsConstructor 

public class Categoria {
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false, unique = true, length = 50)
  private String nome;
}
