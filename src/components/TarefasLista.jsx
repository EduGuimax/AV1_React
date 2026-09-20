import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listar, excluir } from '../api'

export default function TarefasLista() {
  const [tarefas, setTarefas] = useState(null) // null = ainda carregando
  const [erro, setErro] = useState('')

  // Ao abrir a tela, busca as tarefas na API (consulta)
  useEffect(() => {
    let cancelado = false // ignora a resposta se a tela já foi fechada
    listar('tarefas')
      .then((dados) => {
        if (!cancelado) setTarefas(dados)
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message)
      })
    return () => {
      cancelado = true
    }
  }, [])

  async function excluirTarefa(tarefa) {
    if (!window.confirm(`Excluir a tarefa "${tarefa.titulo}"?`)) return
    try {
      await excluir('tarefas', tarefa.id)
      // Tira a tarefa da lista na tela, sem precisar buscar tudo de novo
      setTarefas(tarefas.filter((t) => t.id !== tarefa.id))
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>Tarefas</h1>
      <Link to="/tarefas/novo">+ Nova tarefa</Link>

      {erro && <p className="erro">{erro}</p>}
      {tarefas === null && !erro && <p>Carregando...</p>}
      {tarefas && tarefas.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}

      {tarefas && tarefas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Data limite</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.status}</td>
                <td>{tarefa.prioridade}</td>
                <td>{tarefa.dataLimite}</td>
                <td>
                  <Link to={`/tarefas/${tarefa.id}/editar`}>Editar</Link>{' '}
                  <button onClick={() => excluirTarefa(tarefa)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
