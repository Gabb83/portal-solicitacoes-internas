# 🎫 Portal de Solicitações Internas

Consiste no desenvolvimento de uma aplicação web voltada para o gerenciamento e acompanhamento de solicitações para demandas internas de uma empresa prestadora de serviços. O sistema centraliza solicitações divididas entre vários setores: Recursos Humanos (RH), Tecnologia (TI), Infraestrutura, Finanças e Compras.

## ✅ Funcionalidades
* Dashboard: Exibe uma visão geral das solicitações, incluindo estatísticas e gráficos para facilitar a análise.
* Cadastro de solicitações: Permite que os usuários registrem novas solicitações, fornecendo detalhes como descrição, setor responsável e prioridade.
* Acompanhamento de solicitações: Os usuários podem acompanhar o status de suas solicitações, visualizando atualizações.
* Gestão de solicitações: Os usuários podem atualizar e deletar solicitações em aberto.
* Visualização de Perfil: Permite que os usuários visualizem e editem suas informações pessoais, como nome e e-mail.

## 🛠️ Tecnologias Utilizadas
* **Frontend:** TypeScript, Next.js 16, React, Tailwind CSS, Lucide Icons.
* **Backend:** Java 21, Spring Boot 4.0.8, Spring Data JPA, Jakarta Validation, Lombok.
* **Banco de Dados:** PostgreSQL.
- **Ferramentas e Build:** Maven, Docker.

## 📋 Pré-requisitos para Execução
* **Git**
* **Node.js** (v18.x ou superior)
* **JDK 17 ou 21**
* **PostgreSQL 15+** ou **Docker**
* **Docker**

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/Gabb83/portal-solicitacoes-internas

cd portal-solicitacoes-internas
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
cd backend (dir portal-solicitacoes-internas/backend)

mvn clean install
mvn spring-boot:run
ou
PortalSolicitacoesInternasApplication.java (Run)

(disponível em http://localhost:8080)
```