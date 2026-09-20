import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { atualizar, buscar, criar } from '../api'
import { paraApi, paraFormulario } from '../formulario'
import Campo from './Campo'

// Valores iniciais de um cliente novo
const clienteVazio = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  estado: '',
}

// Serve para as duas telas: /clientes/novo (cadastro) e /clientes/:id/editar (atualização)
export default function ClienteForm() {
  const { id } = useParams() // só existe na edição
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(clienteVazio)
  const [erro, setErro] = useState('')

  // Na edição, busca o cliente na API e preenche o formulário
  useEffect(() => {
    if (!id) return
    // "cancelado" evita que uma resposta atrasada apague o que o usuário já digitou
    let cancelado = false
    buscar('clientes', id)
      .then((dados) => {
        if (!cancelado) setCliente(paraFormulario(dados, clienteVazio))
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
    setCliente({ ...cliente, [evento.target.name]: evento.target.value })
  }

  async function salvar(evento) {
    evento.preventDefault() // impede o navegador de recarregar a página
    setErro('')
    try {
      const dados = paraApi(cliente)
      if (id) {
        await atualizar('clientes', id, dados)
      } else {
        await criar('clientes', dados)
      }
      navigate('/clientes') // volta para a lista
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>{id ? 'Editar cliente' : 'Novo cliente'}</h1>

      <form onSubmit={salvar}>
        <Campo label="Nome" nome="nome" valor={cliente.nome} aoMudar={mudar} obrigatorio />
        <Campo label="E-mail" nome="email" tipo="email" valor={cliente.email} aoMudar={mudar} obrigatorio />
        <Campo label="Telefone" nome="telefone" valor={cliente.telefone} aoMudar={mudar} />
        <Campo label="Cidade" nome="cidade" valor={cliente.cidade} aoMudar={mudar} />
        <Campo label="Estado" nome="estado" valor={cliente.estado} aoMudar={mudar} />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/clientes">Cancelar</Link>
      </form>
    </>
  )
}
