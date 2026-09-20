# AV1 React - CRUD

CRUD de Produtos, Clientes e Tarefas feito com React, Vite e react-router-dom,
consumindo a API `http://177.190.80.28:3005`.

## Como rodar

```bash
npm install
npm run dev
```

Abrir em http://localhost:5173

A API não libera CORS, então o `vite.config.js` tem um proxy: as chamadas para `/api`
são redirecionadas para a API. Por isso precisa rodar com `npm run dev`.

## Rotas

- `/` início
- `/produtos`, `/produtos/novo`, `/produtos/:id/editar`
- `/clientes`, `/clientes/novo`, `/clientes/:id/editar`
- `/tarefas`, `/tarefas/novo`, `/tarefas/:id/editar`
# AV1_React
