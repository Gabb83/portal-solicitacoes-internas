-- Inserção de Categorias Iniciais
INSERT INTO categorias (nome) VALUES ('TI') ON CONFLICT DO NOTHING;
INSERT INTO categorias (nome) VALUES ('RH') ON CONFLICT DO NOTHING;
INSERT INTO categorias (nome) VALUES ('Financeiro') ON CONFLICT DO NOTHING;
INSERT INTO categorias (nome) VALUES ('Infraestrutura') ON CONFLICT DO NOTHING;
INSERT INTO categorias (nome) VALUES ('Compras') ON CONFLICT DO NOTHING;

-- Inserção de Usuário de Teste (Senha simples conforme o AuthService)
INSERT INTO usuarios (nome, email, senha, data_criacao) 
VALUES ('João Silva', 'admin@empresa.com', '123456', NOW()) 
ON CONFLICT DO NOTHING;

-- Inserção de Solicitações de Exemplo para o Dashboard
INSERT INTO solicitacoes (titulo, descricao, status, categoria_id, usuario_id, data_criacao, data_atualizacao)
VALUES ('Troca de Notebook', 'Aparelho antigo travando nas reuniões', 'ABERTO', 1, 1, NOW(), NOW());

INSERT INTO solicitacoes (titulo, descricao, status, categoria_id, usuario_id, data_criacao, data_atualizacao)
VALUES ('Acesso ao Sistema Financeiro', 'Solicitação de perfil de consulta', 'EM_ATENDIMENTO', 3, 1, NOW(), NOW());

INSERT INTO solicitacoes (titulo, descricao, status, categoria_id, usuario_id, data_criacao, data_atualizacao)
VALUES ('Reembolso de Viagem', 'Comprovante em anexo via e-mail', 'CONCLUIDO', 3, 1, NOW(), NOW());