# Questify - Gamificação de Tarefas

Questify é uma aplicação web que transforma suas tarefas diárias em uma experiência gamificada. Complete missões, ganhe XP e resgate recompensas personalizadas.

## 🚀 Funcionalidades

### Sistema de Missões
- Crie e gerencie suas tarefas diárias
- Cada tarefa completada gera XP
- Acompanhe seu progresso com sistema de níveis
- Organize missões por status (Pendentes/Concluídas)

### Sistema de Recompensas
- Crie recompensas personalizadas
- Estabeleça custos em XP
- Resgate recompensas ao acumular XP suficiente
- Visualize histórico de recompensas resgatadas

### Perfil de Usuário
- Acompanhe seu progresso
- Visualize XP total e nível atual
- Histórico de conquistas
- Gestão de conta

## 🛠️ Tecnologias Utilizadas

### Frontend
- Vue.js 3
- Vue Router
- Pinia (Gerenciamento de Estado)
- SCSS (Estilização)
- Phosphor Icons (Biblioteca de Ícones)

### Backend
- NestJS
- Prisma ORM
- PostgreSQL (via Supabase)
- Class Validator
- JWT para autenticação

## 📦 Estrutura do Projeto

```
questify/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── scss/
│   │   ├── components/
│   │   │   ├── AppNavbar.vue
│   │   │   └── RewardModal.vue
│   │   ├── views/
│   │   │   ├── TasksView.vue
│   │   │   └── RewardsView.vue
│   │   ├── stores/
│   │   │   └── userStore.js
│   │   └── services/
│   │       ├── api.js
│   │       ├── taskService.js
│   │       └── rewardService.js
│   └── ...
└── backend/
    ├── src/
    │   ├── prisma/
    │   │   └── schema.prisma
    │   ├── tasks/
    │   │   ├── tasks.controller.ts
    │   │   └── tasks.service.ts
    │   └── rewards/
    │       ├── rewards.controller.ts
    │       └── rewards.service.ts
    └── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js v16+
- PostgreSQL ou conta no Supabase
- npm ou yarn

### Configuração do Backend
```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Executar migrations do Prisma
npx prisma generate
npx prisma db push

# Iniciar servidor de desenvolvimento
npm run start:dev
```

### Configuração do Frontend
```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## ✨ Próximos Passos

- [ ] Implementar autenticação
- [ ] Adicionar sistema de conquistas
- [ ] Criar tema claro
- [ ] Adicionar notificações
- [ ] Implementar sistema de streak
- [ ] Adicionar estatísticas e gráficos
- [ ] Criar modo offline
- [ ] Implementar PWA
