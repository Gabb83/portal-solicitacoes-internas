INSERT INTO categorias (nome)
VALUES
    ('TI'),
    ('RH'),
    ('COMPRAS'),
    ('FINANCEIRO'),
    ('INFRAESTRUTURA')
ON CONFLICT DO NOTHING;


INSERT INTO usuarios (nome, email, senha, data_criacao)
VALUES (
    'Administrador',
    'admin@empresa.com',
    '$2a$10$IEQuUAbaRzxWQwCrw7neWuaZzQiYym0K8rLFnKubS5o.iv9hAE5MK',
    NOW()
)
ON CONFLICT (email) DO NOTHING;


INSERT INTO solicitacoes (
    titulo,
    descricao,
    status,
    categoria_id,
    usuario_id,
    data_criacao,
    data_atualizacao
)
VALUES (
    'Troca de Notebook',
    'Aparelho antigo travando nas reuniões',
    'ABERTO',
    1,
    (SELECT id FROM usuarios WHERE email = 'admin@empresa.com'),
    NOW(),
    NOW()
);

INSERT INTO solicitacoes (
    titulo,
    descricao,
    status,
    categoria_id,
    usuario_id,
    data_criacao,
    data_atualizacao
)
VALUES (
    'Acesso ao Sistema Financeiro',
    'Solicitação de perfil de consulta',
    'EM_ATENDIMENTO',
    3,
    (SELECT id FROM usuarios WHERE email = 'admin@empresa.com'),
    NOW(),
    NOW()
);

INSERT INTO solicitacoes (
    titulo,
    descricao,
    status,
    categoria_id,
    usuario_id,
    data_criacao,
    data_atualizacao
)
VALUES (
    'Reembolso de Viagem',
    'Comprovante em anexo via e-mail',
    'CONCLUIDO',
    3,
    (SELECT id FROM usuarios WHERE email = 'admin@empresa.com'),
    NOW(),
    NOW()
);