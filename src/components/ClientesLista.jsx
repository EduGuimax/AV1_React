import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listar, excluir } from '../api'

export default function ClientesLista() {
  const [clientes, setClientes] = useState(null) // null = ainda carregando
  const [erro, setErro] = useState('')

  // Ao abrir a tela, busca os clientes na API (consulta)
  useEffect(() => {
    let cancelado = false // ignora a resposta se a tela já foi fechada
    listar('clientes')
      .then((dados) => {
        if (!cancelado) setClientes(dados)
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message)
      })
    return () => {
      cancelado = true
    }
  }, [])

  async function excluirCliente(cliente) {
    if (!window.confirm(`Excluir o cliente "${cliente.nome}"?`)) return
    try {
      await excluir('clientes', cliente.id)
      // Tira o cliente da lista na tela, sem precisar buscar tudo de novo
      setClientes(clientes.filter((c) => c.id !== cliente.id))
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>Clientes</h1>
      <Link to="/clientes/novo">+ Novo cliente</Link>

      {erro && <p className="erro">{erro}</p>}
      {clientes === null && !erro && <p>Carregando...</p>}
      {clientes && clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}

      {clientes && clientes.length > 0 && (
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.estado}</td>
                <td>
                  <Link to={`/clientes/${cliente.id}/editar`}>Editar</Link>{' '}
                  <button onClick={() => excluirCliente(cliente)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
