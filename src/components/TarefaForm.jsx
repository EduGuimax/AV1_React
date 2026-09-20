import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function TarefaForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    status: 'pendente',
    prioridade: 'media',
    dataLimite: '',
  })
  const [erro, setErro] = useState('')

  // se tem id na url é edição, então busca a tarefa pra preencher o formulário
  useEffect(() => {
    if (id) {
      fetch('/api/tarefas/' + id)
        .then((res) => res.json())
        .then((dados) => {
          // a API manda null nos campos vazios e o input não aceita null
          for (const campo in dados) {
            if (dados[campo] === null) dados[campo] = ''
          }
          setTarefa(dados)
        })
    }
  }, [id])

  function mudar(e) {
    setTarefa({ ...tarefa, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()

    const dados = {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
    }
    // a API não aceita data vazia, então só manda se preencheu
    if (tarefa.dataLimite !== '') dados.dataLimite = tarefa.dataLimite

    let url = '/api/tarefas'
    let metodo = 'POST'
    if (id) {
      url = url + '/' + id
      metodo = 'PUT'
    }

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })

    if (res.ok) {
      navigate('/tarefas')
    } else {
      const corpo = await res.json()
      setErro(corpo.erros ? corpo.erros.join(', ') : corpo.erro)
    }
  }

  return (
    <div>
      <h1>{id ? 'Editar tarefa' : 'Nova tarefa'}</h1>

      <form onSubmit={salvar}>
        <div className="campo">
          <label>Título *</label>
          <input name="titulo" value={tarefa.titulo} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>Descrição</label>
          <input name="descricao" value={tarefa.descricao} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Status</label>
          <select name="status" value={tarefa.status} onChange={mudar}>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
        <div className="campo">
          <label>Prioridade</label>
          <select name="prioridade" value={tarefa.prioridade} onChange={mudar}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div className="campo">
          <label>Data limite</label>
          <input name="dataLimite" type="date" value={tarefa.dataLimite} onChange={mudar} />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/tarefas">Cancelar</Link>
      </form>
    </div>
  )
}

export default TarefaForm
