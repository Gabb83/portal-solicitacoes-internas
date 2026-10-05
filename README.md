# 🎫 Portal de Solicitações Internas

Consiste no desenvolvimento de uma aplicação web voltada para o gerenciamento e acompanhamento de solicitações para demandas internas de uma empresa prestadora de serviços. O sistema centraliza solicitações divididas entre vários setores: Recursos Humanos (RH), Tecnologia (TI), Infraestrutura, Finanças e Compras.

## ✅ Funcionalidades
- **Dashboard:** Exibe uma visão geral das solicitações, incluindo estatísticas e gráficos para facilitar a análise.
- **Cadastro de solicitações:** Permite que os usuários registrem novas solicitações, fornecendo detalhes como descrição, setor responsável e prioridade.
- **Acompanhamento de solicitações:** Os usuários podem acompanhar o status de suas solicitações, visualizando atualizações.
- **Gestão de solicitações:** Os usuários podem atualizar e deletar solicitações em aberto.
- **Visualização de Perfil:** Permite que os usuários visualizem e editem suas informações pessoais, como nome e e-mail.
- **Autenticação e Autorização:** Implementa um sistema de login com autenticação segura baseada em JWT, garantindo que apenas usuários autorizados possam acessar determinadas funcionalidades.
- **Controle de acesso:** Proteção dos endpoints da API por autenticação.

## 🛠️ Tecnologias Utilizadas
* **Frontend:** TypeScript, Next.js 16, React, Tailwind CSS, Lucide Icons.
* **Backend:** Java 21, Spring Boot 4.0.8, Spring Data JPA, Jakarta Validation, Lombok, JWT, BCrypt.
* **Banco de Dados:** PostgreSQL 17.
- **Ferramentas e Build:** Maven, Docker, Docker Compose.

## 📋 Pré-requisitos para Execução
* **Git**
* **Docker e Docker Compose**

(Não necessário se executado utilizando Docker Compose)
* **Node.js** (v18.x ou superior)
* **JDK 17 ou 21**
* **PostgreSQL 15+** 

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/Gabb83/portal-solicitacoes-internas

cd portal-solicitacoes-internas
```

### 2. Rodar o projeto utilizando Docker Compose
```bash
docker-compose up --build // reconstruir e rodar o projeto no terminal
ou
docker compose up --build -d // para rodar em background

Frontend: http://localhost:3000
Backend: http://localhost:8080
Swagger: http://localhost:8080/swagger-ui/index.html

(criado automaticamente um usuário admin para teste)
E-mail: admin@empresa.com
Senha: admin123
```

### 2. Rodar frontend e backend separadamente, em terminais diferentes.
```bash
cd frontend (dir portal-solicitacoes-internas/frontend)

npm install
npm run dev

(disponível em http://localhost:3000)
```
### 3. Rodar backend (new terminal ou extension pack for java vscode)
```bash
cd backend/portal-solicitacoes (dir portal-solicitacoes-internas/backend/portal-solicitacoes)
./mvnw spring-boot:run

ou

PortalSolicitacoesInternasApplication.java (Run)
(disponível em http://localhost:8080)

Swagger: http://localhost:8080/swagger-ui/index.html
```

### 📁 Estrutura do Projeto
```
portal-solicitacoes-internas/
├── backend/
│   └── portal-solicitacoes/
│       ├── src/
│       ├── target/
│       ├── Dockerfile
│       ├── mvnw
│       ├── mvnw.cmd
│       └── pom.xml
│
├── database/
│   └── schema.sql
│
├── docs/
│   └── (relatórios, diagramas e documentação adicional e demonstrações do projeto)
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── (demais arquivos do frontend)
│
├── .editorConfig
├── .gitignore
├── docker-compose.yml
└── README.md
```