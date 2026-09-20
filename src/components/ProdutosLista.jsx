import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listar, excluir } from '../api'

export default function ProdutosLista() {
  const [produtos, setProdutos] = useState(null) // null = ainda carregando
  const [erro, setErro] = useState('')

  // Ao abrir a tela, busca os produtos na API (consulta)
  useEffect(() => {
    let cancelado = false // ignora a resposta se a tela já foi fechada
    listar('produtos')
      .then((dados) => {
        if (!cancelado) setProdutos(dados)
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message)
      })
    return () => {
      cancelado = true
    }
  }, [])

  async function excluirProduto(produto) {
    if (!window.confirm(`Excluir o produto "${produto.nome}"?`)) return
    try {
      await excluir('produtos', produto.id)
      // Tira o produto da lista na tela, sem precisar buscar tudo de novo
      setProdutos(produtos.filter((p) => p.id !== produto.id))
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>Produtos</h1>
      <Link to="/produtos/novo">+ Novo produto</Link>

      {erro && <p className="erro">{erro}</p>}
      {produtos === null && !erro && <p>Carregando...</p>}
      {produtos && produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}

      {produtos && produtos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{produto.quantidadeEstoque}</td>
                <td>{produto.categoria}</td>
                <td>{produto.ativo ? 'Sim' : 'Não'}</td>
                <td>
                  <Link to={`/produtos/${produto.id}/editar`}>Editar</Link>{' '}
                  <button onClick={() => excluirProduto(produto)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
