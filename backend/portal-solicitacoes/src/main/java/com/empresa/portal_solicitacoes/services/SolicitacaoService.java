package com.empresa.portal_solicitacoes.services;

import com.empresa.portal_solicitacoes.repositories.*;
import com.empresa.portal_solicitacoes.models.*;
import com.empresa.portal_solicitacoes.dtos.*;
import com.empresa.portal_solicitacoes.enums.*;
import com.empresa.portal_solicitacoes.exceptions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service 
public class SolicitacaoService {
  private final SolicitacaoRepository solicitacaoRepository;
  private final UsuarioRepository usuarioRepository;
  private final CategoriaRepository categoriaRepository;

  public SolicitacaoService(SolicitacaoRepository solicitacaoRepository, CategoriaRepository categoriaRepository, UsuarioRepository usuarioRepository) {
    this.solicitacaoRepository = solicitacaoRepository;
    this.categoriaRepository = categoriaRepository;
    this.usuarioRepository = usuarioRepository;
  }

  @Transactional
  public SolicitacaoResponseDTO criar(SolicitacaoRequestDTO dto) {
    Categoria categoria = categoriaRepository.findById(dto.categoriaId())
    .orElseThrow(() ->
      new ResourceNotFoundException(
        "Categoria não encontrada com o ID: " + dto.categoriaId()
      )
    );

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
    Long usuarioId = Long.valueOf(authentication.getName());
    Usuario usuario = usuarioRepository.findById(usuarioId)
      .orElseThrow(() ->
        new ResourceNotFoundException(
          "Usuário não encontrado com o ID: " + usuarioId
        )
    );

    Solicitacao solicitacao = new Solicitacao();
    solicitacao.setTitulo(dto.titulo());
    solicitacao.setDescricao(dto.descricao());
    solicitacao.setCategoria(categoria);
    solicitacao.setUsuario(usuario);
    solicitacao.setStatus(StatusSolicitacao.ABERTO);

    Solicitacao salva = solicitacaoRepository.save(solicitacao);
    return SolicitacaoResponseDTO.fromEntity(salva);
  }

  @Transactional(readOnly = true)
  public Page<SolicitacaoResponseDTO> buscarComFiltros(
    String titulo,
    Long categoriaId,
    StatusSolicitacao status,
    LocalDate dataInicio,
    LocalDate dataFim,
    Pageable pageable) {

    Specification<Solicitacao> spec = (root, query, cb) -> null;

    if(titulo != null && !titulo.isBlank()) {
      spec = spec.and((root, query, cb) ->
        cb.like(
          cb.lower(root.get("titulo")),
          "%" + titulo.toLowerCase() + "%"
        )
      );
    }

    if(categoriaId != null) {
      spec = spec.and((root, query, cb) ->
        cb.equal(
          root.get("categoria").get("id"),
          categoriaId
        )
      );
    }

    if(status != null) {
      spec = spec.and((root, query, cb) ->
        cb.equal(
          root.get("status"),
          status
        )
      );
    }

    if(dataInicio != null) {
      LocalDateTime inicio = dataInicio.atStartOfDay();
      spec = spec.and((root, query, cb) ->
        cb.greaterThanOrEqualTo(
          root.get("dataCriacao"),
          inicio
        )
      );
    }

    if(dataFim != null) {
      LocalDateTime fim = dataFim.atTime(LocalTime.MAX);
      spec = spec.and((root, query, cb) ->
        cb.lessThanOrEqualTo(
          root.get("dataCriacao"),
          fim
        )
      );
    }

    return solicitacaoRepository.findAll(spec, pageable).map(SolicitacaoResponseDTO::fromEntity);
  }

  @Transactional (readOnly = true)
  public SolicitacaoResponseDTO buscarPorId(Long id) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada com o ID: " + id));
    
      return SolicitacaoResponseDTO.fromEntity(solicitacao);
  }

  @Transactional
  public SolicitacaoResponseDTO atualizarStatus(Long id, StatusSolicitacao novoStatus) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada com o ID: " + id));

    solicitacao.setStatus(novoStatus);
    Solicitacao atualizada = solicitacaoRepository.save(solicitacao);
    return SolicitacaoResponseDTO.fromEntity(atualizada);
  }


  @Transactional
  public SolicitacaoResponseDTO atualizar(Long id, SolicitacaoUpdateDTO dto) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(
        "Solicitação não encontrada com o ID: " + id));

    Categoria categoria = categoriaRepository.findById(dto.categoriaId())
      .orElseThrow(() -> new ResourceNotFoundException(
        "Categoria não encontrada com o ID: " + dto.categoriaId()));

    solicitacao.setTitulo(dto.titulo());
    solicitacao.setDescricao(dto.descricao());
    solicitacao.setStatus(dto.status());
    solicitacao.setCategoria(categoria);

    Solicitacao atualizada = solicitacaoRepository.save(solicitacao);

    return SolicitacaoResponseDTO.fromEntity(atualizada);
  }

  @Transactional
  public void deletar(Long id) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
      .orElseThrow(() ->
        new ResourceNotFoundException(
          "Solicitação não encontrada com o ID: " + id
        )
    );

    if(solicitacao.getStatus() != StatusSolicitacao.ABERTO) {
      throw new RegraNegocioException(
        "Apenas solicitações com status ABERTO podem ser excluídas."
      );
    }

    solicitacaoRepository.delete(solicitacao);
  }

  @Transactional(readOnly = true)
  public DashboardStatusDTO obterEstatisticasDashboard() {
    long total = solicitacaoRepository.count();
    long abertas = solicitacaoRepository.countByStatus(StatusSolicitacao.ABERTO);
    long emAtendimento = solicitacaoRepository.countByStatus(StatusSolicitacao.EM_ATENDIMENTO);
    long concluidas = solicitacaoRepository.countByStatus(StatusSolicitacao.CONCLUIDO);

    Map<String, Long> porStatus = solicitacaoRepository
      .contarPorStatus()
      .stream()
      .collect(Collectors.toMap(
          item -> ((StatusSolicitacao) item[0]).name(),
          item -> (Long) item[1]
    ));

    Map<String, Long> porCategoria = solicitacaoRepository
      .contarPorCategoria()
      .stream()
      .collect(Collectors.toMap(
          item -> (String) item[0],
          item -> (Long) item[1],
          (a, b) -> a,
          LinkedHashMap::new
    ));

    return new DashboardStatusDTO(
      total,
      abertas,
      emAtendimento,
      concluidas,
      porStatus,
      porCategoria
    );
  }
}
