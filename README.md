# 🏋️ EasyGym – Organize sua rotina de treinos

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css\&logoColor=white)
![Status](https://img.shields.io/badge/Status-Acadêmico-success)

## 📖 Sobre o Projeto

**EasyGym** é uma aplicação web desenvolvida como MVP (*Minimum Viable Product*) para a disciplina de Desenvolvimento Web da **PUC-Rio**.

O objetivo do sistema é auxiliar usuários no gerenciamento de sua rotina de treinos, permitindo criar exercícios personalizados, registrar presença, acompanhar frequência semanal e visualizar o histórico completo das atividades realizadas.

A aplicação foi construída com foco em **usabilidade**, **responsividade** e **organização dos dados**, utilizando armazenamento local para simular funcionalidades de um sistema real.

### 🌐 Demonstração

**Acesse a aplicação online:**

👉 https://whandger.github.io/PUC-Rio-MVP-front-End-Vite/#/

---

# ✨ Funcionalidades

### 🔐 Autenticação

* Login de usuários
* Cadastro de novas contas
* Recuperação de senha (simulada)
* Logout
* Rotas protegidas

### 🏠 Home Dashboard

* Saudação personalizada
* Calendário de frequência
* Registro de presença
* Cronômetro automático
* Resumo do treino selecionado

### 💪 Gerenciamento de Treinos

* Criar treinos
* Editar treinos
* Excluir treinos
* Adicionar exercícios
* Definir:

  * Grupo muscular
  * Séries
  * Repetições
  * Peso utilizado

### 📜 Histórico

* Visualização completa dos treinos realizados
* Filtro por período
* Edição de cargas/pesos registrados

### 📚 Catálogo de Exercícios

* Base de dados em JSON
* GIF demonstrativo
* Instruções de execução
* Página individual para cada exercício

### 🎨 Interface

* Modais interativos
* Navegação intuitiva
* Página 404 personalizada
* Layout responsivo para desktop, tablet e mobile

### 💾 Persistência Local

* Usuários armazenados em localStorage
* Treinos armazenados em localStorage
* Histórico armazenado em localStorage
* Estado dos cards preservado entre navegações

---

# 🛠 Tecnologias Utilizadas

| Tecnologia          | Finalidade                          |
| ------------------- | ----------------------------------- |
| React 18            | Interface da aplicação              |
| TypeScript          | Tipagem estática                    |
| Vite                | Build e ambiente de desenvolvimento |
| React Router DOM v6 | Gerenciamento de rotas              |
| Tailwind CSS        | Estilização responsiva              |
| Context API         | Gerenciamento de estado global      |
| React Hooks         | Lógica reutilizável                 |
| localStorage        | Persistência simulada               |

---

# 🚀 Instalação

## Pré-requisitos

* Node.js 16+
* npm ou yarn

## Clonar o projeto

```bash
git clone https://github.com/whandger/PUC-Rio-MVP-front-End-Vite.git
cd PUC-Rio-MVP-front-End-Vite/Front-end
```

## Instalar dependências

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

## Acessar aplicação

Abra no navegador:

```text
http://localhost:5173
```

> Como os dados são armazenados em localStorage, é necessário criar uma conta local para utilizar as funcionalidades.

---

## 📁 Estrutura Completa do Projeto

```text
Front-end/
├── public/
│   ├── account.png
│   ├── calendar.png
│   ├── disk_icon.svg
│   ├── favicon.svg
│   ├── gymWeight.png
│   ├── home.png
│   ├── icons.svg
│   ├── lapis.png
│   ├── list.png
│   ├── log.png
│   ├── svglogin.svg
│   └── trash_icon.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Conta/
│   │   │   └── ContaHeader.tsx
│   │   │
│   │   ├── history/
│   │   │   ├── HistoryFilter.tsx
│   │   │   └── HistoryList.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── FrequenciaCalendar.tsx
│   │   │   ├── Introducao.tsx
│   │   │   ├── Presenca.tsx
│   │   │   └── TreinoSummary.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── AddEXButton.tsx
│   │   │   ├── ExercicioJsonModal.tsx
│   │   │   ├── ExerciseSelect.tsx
│   │   │   ├── MuscleSelect.tsx
│   │   │   └── TrainingCard.tsx
│   │   │
│   │   ├── Training/
│   │   │   ├── AddTrainingForm.tsx
│   │   │   ├── ExerciseRow.tsx
│   │   │   └── TrainingList.tsx
│   │   │
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── TrainingContext.tsx
│   │
│   ├── data/
│   │   └── exercicios.json
│   │
│   ├── hooks/
│   │   ├── useAddTrainingForm.ts
│   │   ├── useExerciciosData.ts
│   │   ├── useFrequenciaCalendar.ts
│   │   ├── useHistoryFilter.ts
│   │   ├── usePresenca.ts
│   │   ├── useTrainings.ts
│   │   └── useTreinoSummary.ts
│   │
│   ├── pages/
│   │   ├── ContaPage.tsx
│   │   ├── ExercicioDetailPage.tsx
│   │   ├── HistoricoPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFound.tsx
│   │   └── TreinoPage.tsx
│   │
│   ├── services/
│   │
│   ├── utils/
│   │   ├── expandedCards.ts
│   │   └── generateId.ts
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

# 🧩 Componentes Reutilizáveis

| Componente         | Descrição                                         |
| ------------------ | ------------------------------------------------- |
| TrainingCard       | Card expansível para exibição e edição de treinos |
| ExerciseRow        | Linha de exercício com campos configuráveis       |
| ExerciseSelect     | Seleção de exercícios a partir do JSON            |
| MuscleSelect       | Filtro por grupo muscular                         |
| ExercicioJsonModal | Modal com GIF e instruções                        |
| AddEXButton        | Botão reutilizável para adicionar exercícios      |
| HistoryFilter      | Filtro de período do histórico                    |
| Footer             | Navegação principal da aplicação                  |

---

# 🌐 Rotas da Aplicação

| Rota                     | Descrição                | Protegida |
| ------------------------ | ------------------------ | --------- |
| `/login`                 | Login e cadastro         | ❌         |
| `/`                      | Home Dashboard           | ✅         |
| `/treino`                | Gerenciamento de treinos | ✅         |
| `/historico`             | Histórico de atividades  | ✅         |
| `/conta`                 | Conta do usuário         | ✅         |
| `/exercicio/:exerciseId` | Detalhes do exercício    | ✅         |
| `*`                      | Página 404               | ❌         |

---

# 🧭 Navegação

A aplicação utiliza recursos do React Router:

### useNavigate

Utilizado para:

* Redirecionamento após login
* Logout
* Navegação para detalhes dos exercícios

### useLocation

Utilizado para:

* Destacar rota ativa
* Verificar páginas específicas

### useParams

Utilizado para:

* Capturar o parâmetro `exerciseId`
* Carregar informações do exercício selecionado

---

# 👤 Sistema de Autenticação

O gerenciamento de usuários é realizado através do **AuthContext** utilizando armazenamento local.

### Registro

* Cria usuário
* Salva no localStorage
* Realiza login automático

### Login

* Valida credenciais
* Cria sessão local

### Logout

* Remove sessão
* Redireciona para login

### Recuperação de Senha

* Simulação de envio por e-mail
* Registro em console

---

# 🧪 Simulação de Dados

A aplicação utiliza um modelo totalmente client-side.

### Exercícios

```text
src/data/exercicios.json
```

Contém:

* Nome do exercício
* Grupo muscular
* GIF demonstrativo
* Instruções de execução

### Persistência

Armazenamento local de:

* Usuários
* Treinos
* Histórico
* Frequência
* Estado dos cards expandidos

---

# 📱 Responsividade

O layout foi desenvolvido com Tailwind CSS e adapta-se automaticamente para:

### Mobile 📱

* Navegação inferior
* Componentes empilhados

### Tablet 📟

* Ajustes intermediários de layout

### Desktop 💻

* Footer transformado em barra lateral
* Melhor aproveitamento de espaço

---

# 🎯 Principais Conceitos Aplicados

* Componentização
* Context API
* React Hooks
* Rotas protegidas
* Gerenciamento de estado
* Persistência local
* Responsividade
* Reutilização de componentes
* Tipagem com TypeScript
* Organização por responsabilidades

---

# 🎓 Projeto Acadêmico

Este projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Web** da **PUC-Rio**, com o objetivo de aplicar conceitos modernos de desenvolvimento frontend utilizando React e TypeScript.

---

# 📝 Licença

Projeto desenvolvido para fins acadêmicos.

Sem licença comercial definida.

---

## 👨‍💻 Autor

**Whandger Wolf**

GitHub: https://github.com/Whandger

Desenvolvido com 💙 utilizando React, TypeScript e Vite.
