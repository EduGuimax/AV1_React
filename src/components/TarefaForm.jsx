import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { atualizar, buscar, criar } from '../api'
import { paraApi, paraFormulario } from '../formulario'
import Campo from './Campo'

// Valores iniciais de uma tarefa nova
const tarefaVazia = {
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
  dataLimite: '',
}

// Serve para as duas telas: /tarefas/novo (cadastro) e /tarefas/:id/editar (atualização)
export default function TarefaForm() {
  const { id } = useParams() // só existe na edição
  const navigate = useNavigate()
  const [tarefa, setTarefa] = useState(tarefaVazia)
  const [erro, setErro] = useState('')

  // Na edição, busca a tarefa na API e preenche o formulário
  useEffect(() => {
    if (!id) return
    // "cancelado" evita que uma resposta atrasada apague o que o usuário já digitou
    let cancelado = false
    buscar('tarefas', id)
      .then((dados) => {
        if (!cancelado) setTarefa(paraFormulario(dados, tarefaVazia))
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message)
      })
    return () => {
      cancelado = true
    }
  }, [id])

  // Chamada a cada digitação: atualiza só o campo que mudou
  function mudar(evento) {
    setTarefa({ ...tarefa, [evento.target.name]: evento.target.value })
  }

  async function salvar(evento) {
    evento.preventDefault() // impede o navegador de recarregar a página
    setErro('')
    try {
      const dados = paraApi(tarefa)
      if (id) {
        await atualizar('tarefas', id, dados)
      } else {
        await criar('tarefas', dados)
      }
      navigate('/tarefas') // volta para a lista
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>{id ? 'Editar tarefa' : 'Nova tarefa'}</h1>

      <form onSubmit={salvar}>
        <Campo label="Título" nome="titulo" valor={tarefa.titulo} aoMudar={mudar} obrigatorio />
        <Campo label="Descrição" nome="descricao" valor={tarefa.descricao} aoMudar={mudar} />

        <div className="campo">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={tarefa.status} onChange={mudar}>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="prioridade">Prioridade</label>
          <select id="prioridade" name="prioridade" value={tarefa.prioridade} onChange={mudar}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <Campo label="Data limite" nome="dataLimite" tipo="date" valor={tarefa.dataLimite} aoMudar={mudar} />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/tarefas">Cancelar</Link>
      </form>
    </>
  )
}
