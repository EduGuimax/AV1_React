import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ClientesLista() {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetch('/api/clientes')
      .then((res) => res.json())
      .then((dados) => setClientes(dados))
  }, [])

  function excluir(id) {
    if (!confirm('Deseja excluir este cliente?')) return

    fetch('/api/clientes/' + id, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        setClientes(clientes.filter((c) => c.id !== id))
      } else {
        alert('Erro ao excluir')
      }
    })
  }

  return (
    <div>
      <h1>Clientes</h1>
      <Link to="/clientes/novo">+ Novo cliente</Link>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.cidade}</td>
              <td>{c.estado}</td>
              <td>
                <Link to={'/clientes/' + c.id + '/editar'}>Editar</Link>{' '}
                <button onClick={() => excluir(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientesLista
