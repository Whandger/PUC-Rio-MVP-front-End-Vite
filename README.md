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

---

## 🌐 Demonstração

**Acesse a aplicação online:**
👉 https://whandger.github.io/PUC-Rio-MVP-front-End-Vite/#/

---

# ✨ Funcionalidades

## 🔐 Autenticação

* Login de usuários
* Cadastro de novas contas
* Recuperação de senha (simulada)
* Logout
* Rotas protegidas

## 🏠 Home Dashboard

* Saudação personalizada
* Calendário de frequência semanal
* Registro de presença com cronômetro automático
* Resumo do treino selecionado

## 💪 Gerenciamento de Treinos

* Criar, editar e excluir treinos
* Adicionar exercícios personalizados
* Seleção por grupo muscular
* Definição de séries, repetições e carga
* Busca inteligente de exercícios utilizando o catálogo integrado

## 📜 Histórico

* Visualização completa dos treinos realizados
* Filtro por período
* Edição de pesos registrados
* Consulta detalhada dos exercícios executados

## 📚 Catálogo de Exercícios

* Base de dados em JSON
* GIF demonstrativo para execução
* Instruções detalhadas
* Página individual para cada exercício
* Navegação dinâmica utilizando parâmetros de rota

## 📊 Status e Estatísticas

* Total de treinos por ano
* Percentual anual de frequência
* Frequência por dia da semana (gráfico de barras)
* Heatmap anual de atividades
* Evolução de carga por exercício (gráfico de linha)
* Filtro por ano
* Seleção de músculo e exercício
* Compatibilidade com exercícios personalizados criados pelo usuário

## 👤 Configurações da Conta

* Alteração de nome de usuário
* Alteração de senha
* Upload de foto de perfil
* Alternância entre tema claro e escuro
* Exclusão completa da conta e dos dados associados

## 🎨 Interface

* Tema claro e escuro persistente
* Modais interativos
* Navegação com Material Icons
* Página 404 personalizada
* Layout responsivo (mobile, tablet e desktop)
* Cards de treino com estado de expansão persistente

## 💾 Persistência Local

Os seguintes dados são armazenados em `localStorage`:

* Usuários
* Foto de perfil
* Treinos
* Histórico de atividades
* Tema selecionado
* Estado dos cards expandidos

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
| SVG + CSS           | Gráficos nativos sem dependências   |

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

Como os dados são armazenados em `localStorage`, registre uma conta local para acessar as funcionalidades.

---

## 📁 Estrutura do Projeto

```text
Front-end/
├── public/                     # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── Conta/
│   │   ├── history/
│   │   ├── home/
│   │   ├── shared/
│   │   └── Training/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── package.json
├── vite.config.ts
└── README.md
```

### Principais Diretórios

| Diretório    | Responsabilidade                                    |
| ------------ | --------------------------------------------------- |
| `components` | Componentes reutilizáveis e específicos das páginas |
| `pages`      | Telas principais da aplicação                       |
| `context`    | Gerenciamento de estado global com Context API      |
| `hooks`      | Hooks customizados para reutilização de lógica      |
| `data`       | Catálogo local de exercícios                        |
| `utils`      | Funções auxiliares da aplicação                     |
| `services`   | Camada preparada para integrações futuras           |

---

# 🧩 Componentes Reutilizáveis

| Componente         | Descrição                                         |
| ------------------ | ------------------------------------------------- |
| TrainingCard       | Card expansível para exibição e edição de treinos |
| ExerciseRow        | Linha de exercício com campos configuráveis       |
| ExerciseSelect     | Seleção de exercícios a partir do catálogo        |
| MuscleSelect       | Filtro por grupo muscular                         |
| ExercicioJsonModal | Modal com GIF e instruções                        |
| AddEXButton        | Botão reutilizável para adicionar exercícios      |
| HistoryFilter      | Filtro de período do histórico                    |
| Footer             | Navegação principal da aplicação                  |
| Accordion          | Menu expansível                                   |
| BarChart           | Gráfico de barras da frequência semanal           |
| LineChart          | Gráfico de evolução de carga                      |
| WorkoutHeatmap     | Heatmap anual de atividades                       |
| ConfigSection      | Configurações da conta                            |
| StatusSection      | Dashboard estatístico                             |

---

# 🌐 Rotas da Aplicação

| Rota                     | Descrição                | Protegida |
| ------------------------ | ------------------------ | --------- |
| `/login`                 | Login e cadastro         | ❌         |
| `/`                      | Home Dashboard           | ✅         |
| `/treino`                | Gerenciamento de treinos | ✅         |
| `/historico`             | Histórico de atividades  | ✅         |
| `/conta`                 | Conta e estatísticas     | ✅         |
| `/exercicio/:exerciseId` | Detalhes do exercício    | ✅         |
| `*`                      | Página 404               | ❌         |

---

# 🧭 Navegação

A aplicação utiliza recursos do React Router:

### useNavigate

* Redirecionamento após login e logout
* Navegação para detalhes dos exercícios

### useLocation

* Destacar rota ativa no footer
* Verificar página de login

### useParams

* Capturar o parâmetro `exerciseId`
* Carregar informações do exercício selecionado

---

# 👤 Sistema de Autenticação

Gerenciamento via `AuthContext` utilizando `localStorage`.

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

### Recuperação

* Simulação de envio por e-mail

### Atualização de Perfil

* Alteração de nome
* Alteração de senha
* Atualização de foto de perfil

---

# 🎨 Tema Escuro / Claro

O sistema de temas é gerenciado por meio do `ThemeContext`.

### Funcionalidades

* Persistência automática da preferência do usuário
* Aplicação global utilizando Tailwind CSS
* Alternância em tempo real sem recarregar a página
* Compatibilidade com componentes, formulários e gráficos

---

# 🧪 Simulação de Dados

## Exercícios

Os exercícios são carregados de:

```text
src/data/exercicios.json
```

Cada exercício contém:

* Nome
* Grupo muscular
* GIF demonstrativo
* Instruções detalhadas

## Persistência

São armazenados em `localStorage`:

* Usuários
* Foto de perfil
* Treinos
* Histórico
* Tema
* Estado dos cards expandidos

---

# 📱 Responsividade

O Tailwind CSS adapta automaticamente a interface para diferentes dispositivos.

### Mobile

* Navegação inferior
* Componentes empilhados

### Tablet

* Ajustes intermediários de layout

### Desktop

* Footer lateral
* Gráficos com melhor aproveitamento do espaço
* Layout otimizado para telas maiores

---

# 🎯 Principais Conceitos Aplicados

* React 18 + TypeScript
* Context API (Autenticação, Treinos e Tema)
* React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`)
* React Router DOM v6
* Rotas protegidas
* Persistência local com `localStorage`
* Gráficos nativos utilizando SVG
* Heatmap de atividades
* Tema escuro/claro
* Componentização e reutilização de componentes
* Layout responsivo com Tailwind CSS
* Filtros dinâmicos
* Página 404 personalizada

---

# 🎓 Projeto Acadêmico

Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento Web da PUC-Rio, aplicando conceitos modernos de frontend e arquitetura de aplicações React.

---

# 📝 Licença

Projeto acadêmico sem licença comercial definida.

---

# 👨‍💻 Autor

**Whandger Wolf**

GitHub: https://github.com/Whandger

Desenvolvido com 💙 utilizando React, TypeScript e Vite.
