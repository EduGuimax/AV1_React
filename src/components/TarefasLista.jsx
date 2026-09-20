import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TarefasLista() {
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    fetch('/api/tarefas')
      .then((res) => res.json())
      .then((dados) => setTarefas(dados))
  }, [])

  function excluir(id) {
    if (!confirm('Deseja excluir esta tarefa?')) return

    fetch('/api/tarefas/' + id, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        setTarefas(tarefas.filter((t) => t.id !== id))
      } else {
        alert('Erro ao excluir')
      }
    })
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <Link to="/tarefas/novo">+ Nova tarefa</Link>

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
          {tarefas.map((t) => (
            <tr key={t.id}>
              <td>{t.titulo}</td>
              <td>{t.status}</td>
              <td>{t.prioridade}</td>
              <td>{t.dataLimite}</td>
              <td>
                <Link to={'/tarefas/' + t.id + '/editar'}>Editar</Link>{' '}
                <button onClick={() => excluir(t.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TarefasLista
