import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProdutosLista() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    fetch('/api/produtos')
      .then((res) => res.json())
      .then((dados) => setProdutos(dados))
  }, [])

  function excluir(id) {
    if (!confirm('Deseja excluir este produto?')) return

    fetch('/api/produtos/' + id, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        setProdutos(produtos.filter((p) => p.id !== id))
      } else {
        alert('Erro ao excluir')
      }
    })
  }

  return (
    <div>
      <h1>Produtos</h1>
      <Link to="/produtos/novo">+ Novo produto</Link>

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
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>{p.quantidadeEstoque}</td>
              <td>{p.categoria}</td>
              <td>{p.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <Link to={'/produtos/' + p.id + '/editar'}>Editar</Link>{' '}
                <button onClick={() => excluir(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProdutosLista
