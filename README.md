# AV1 React – CRUD com React + react-router-dom

Aplicação React (Vite, JavaScript, ESLint) que consome a API `http://177.190.80.28:3005`
([documentação](http://177.190.80.28:3005/docs/)) com cadastro, consulta, atualização e exclusão de
**Produtos**, **Clientes** e **Tarefas**.

## Como rodar

Requer Node 20.19+ (ou 22.12+).

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run lint
npm run build
```

> A API não envia headers CORS, então o Vite faz proxy de `/api/*` para ela
> (veja `vite.config.js`). Por isso a app deve ser aberta pelo `npm run dev` (ou `npm run preview`).

## Telas e rotas (react-router-dom)

| Rota                    | O que faz                                  |
| ----------------------- | ------------------------------------------ |
| `/`                     | Início, com links para os cadastros        |
| `/produtos`             | Lista (consulta) + botão Excluir           |
| `/produtos/novo`        | Formulário de cadastro (POST)              |
| `/produtos/:id/editar`  | Formulário de edição (busca por id + PUT)  |

O mesmo vale para `/clientes` e `/tarefas`.

## Estrutura

```
src/
  main.jsx          entrada: liga o React ao HTML e ativa o BrowserRouter
  App.jsx           menu de navegação e a tabela de rotas
  api.js            todas as chamadas à API (listar, buscar, criar, atualizar, excluir)
  formulario.js     ajusta os dados entre a API e os formulários
  components/
    Home.jsx
    Campo.jsx       rótulo + input reutilizado nos formulários
    ProdutosLista.jsx   ProdutoForm.jsx
    ClientesLista.jsx   ClienteForm.jsx
    TarefasLista.jsx    TarefaForm.jsx
```

Conceitos de React usados: componentes, props, `useState`, `useEffect`, formulários controlados,
renderização de listas com `map`/`key` e renderização condicional.
