import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ClienteForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
  })
  const [erro, setErro] = useState('')

  // se tem id na url é edição, então busca o cliente pra preencher o formulário
  useEffect(() => {
    if (id) {
      fetch('/api/clientes/' + id)
        .then((res) => res.json())
        .then((dados) => {
          // a API manda null nos campos vazios e o input não aceita null
          for (const campo in dados) {
            if (dados[campo] === null) dados[campo] = ''
          }
          setCliente(dados)
        })
    }
  }, [id])

  function mudar(e) {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()

    const dados = {
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      cidade: cliente.cidade,
      estado: cliente.estado,
    }

    let url = '/api/clientes'
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
      navigate('/clientes')
    } else {
      const corpo = await res.json()
      setErro(corpo.erros ? corpo.erros.join(', ') : corpo.erro)
    }
  }

  return (
    <div>
      <h1>{id ? 'Editar cliente' : 'Novo cliente'}</h1>

      <form onSubmit={salvar}>
        <div className="campo">
          <label>Nome *</label>
          <input name="nome" value={cliente.nome} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>E-mail *</label>
          <input name="email" type="email" value={cliente.email} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>Telefone</label>
          <input name="telefone" value={cliente.telefone} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Cidade</label>
          <input name="cidade" value={cliente.cidade} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Estado</label>
          <input name="estado" value={cliente.estado} onChange={mudar} />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/clientes">Cancelar</Link>
      </form>
    </div>
  )
}

export default ClienteForm
