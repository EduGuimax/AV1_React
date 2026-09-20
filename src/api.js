// Todas as chamadas à API ficam neste arquivo.
// O Vite redireciona "/api" para a API real (veja vite.config.js).
const BASE_URL = '/api'

const CABECALHO_JSON = { 'Content-Type': 'application/json' }

// Faz a requisição e devolve os dados. Se algo der errado, lança um Error
// com a mensagem para a tela mostrar.
async function chamarApi(caminho, opcoes) {
  let resposta
  try {
    resposta = await fetch(BASE_URL + caminho, opcoes)
  } catch {
    throw new Error('Não foi possível conectar à API.')
  }

  // Excluir devolve status 204 (sem corpo)
  if (resposta.status === 204) return null

  const dados = await resposta.json()

  if (!resposta.ok) {
    // A API manda { erros: [...] } na validação ou { erro: "..." } no resto
    throw new Error(dados.erros ? dados.erros.join(', ') : dados.erro)
  }
  return dados
}

// recurso = 'produtos', 'clientes' ou 'tarefas'

export function listar(recurso) {
  return chamarApi(`/${recurso}`)
}

export function buscar(recurso, id) {
  return chamarApi(`/${recurso}/${id}`)
}

export function criar(recurso, dados) {
  return chamarApi(`/${recurso}`, {
    method: 'POST',
    headers: CABECALHO_JSON,
    body: JSON.stringify(dados),
  })
}

export function atualizar(recurso, id, dados) {
  return chamarApi(`/${recurso}/${id}`, {
    method: 'PUT',
    headers: CABECALHO_JSON,
    body: JSON.stringify(dados),
  })
}

export function excluir(recurso, id) {
  return chamarApi(`/${recurso}/${id}`, { method: 'DELETE' })
}
