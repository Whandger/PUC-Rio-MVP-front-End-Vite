# 🏋️ EasyGym - Plataforma de Treinos

## 📋 Sobre o Projeto

O **EasyGym** é uma aplicação web desenvolvida para auxiliar usuários no acompanhamento de seus treinos e exercícios físicos. A plataforma permite visualizar treinos, histórico de atividades e gerenciar configurações de perfil, tudo com uma interface intuitiva e responsiva.

### 🎯 Funcionalidades Principais

- **Página Inicial**: Visão geral da plataforma
- **Treinos**: Visualização de exercícios e rotinas
- **Histórico**: Acompanhamento do progresso
- **Configurações**: Gerenciamento de perfil e preferências

---

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Estilização e responsividade
- **React Router DOM** - Navegação entre páginas

---

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Whandger/PUC-Rio-MVP-front-End-Vite.git
   ```

2. **Acesse a pasta do projeto**
   ```bash
   cd PUC-Rio-MVP-front-End-Vite
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

5. **Acesse a aplicação**

   Abra o navegador em: [http://localhost:5173/PUC-Rio-MVP-front-End-Vite/](http://localhost:5173/PUC-Rio-MVP-front-End-Vite/)

---

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Footer.tsx        # Navegação inferior
│   └── ContaHeader.tsx   # Cabeçalho da página de conta
├── pages/                # Páginas da aplicação
│   ├── Home.tsx          # Página inicial
│   ├── TreinoPage.tsx    # Página de treinos
│   ├── HistoricoPage.tsx # Histórico do usuário
│   └── ContaPage.tsx     # Configurações da conta
├── App.tsx               # Rotas principais
├── main.tsx              # Entry point
└── index.css             # Estilos globais
```

---

## 🚀 Scripts Disponíveis

| Comando            | Descrição                          |
|--------------------|------------------------------------|
| `npm run dev`      | Inicia servidor de desenvolvimento |
| `npm run build`    | Gera build de produção             |
| `npm run preview`  | Visualiza build localmente         |
| `npm run lint`     | Executa verificação de código      |

---

## 📱 Responsividade

O projeto foi desenvolvido com design responsivo utilizando Tailwind CSS, adaptando-se a diferentes tamanhos de tela:

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🌐 Deploy

A aplicação está configurada para deploy automático no GitHub Pages através de GitHub Actions.

🔗 **Link do projeto:** [https://whandger.github.io/PUC-Rio-MVP-front-End-Vite/](https://whandger.github.io/PUC-Rio-MVP-front-End-Vite/)

---

## 👨‍💻 Autor

**Whandger Wolffenbüttel**

- GitHub: [@Whandger](https://github.com/Whandger)

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como parte do MVP (Minimum Viable Product) para disciplina da PUC-Rio, demonstrando conceitos de:

- Componentização em React
- Roteamento de páginas
- Gerenciamento de estado com hooks
- Design responsivo
- Integração contínua com GitHub Pages

---

⭐ Se gostou do projeto, deixe uma estrela no repositório!