import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ProdutoForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '',
    categoria: '',
    marca: '',
    cor: '',
    peso: '',
    altura: '',
    largura: '',
    profundidade: '',
    codigoBarras: '',
    fabricante: '',
    ativo: true,
  })
  const [erro, setErro] = useState('')

  // se tem id na url é edição, então busca o produto pra preencher o formulário
  useEffect(() => {
    if (id) {
      fetch('/api/produtos/' + id)
        .then((res) => res.json())
        .then((dados) => {
          // a API manda null nos campos vazios e o input não aceita null
          for (const campo in dados) {
            if (dados[campo] === null) dados[campo] = ''
          }
          setProduto(dados)
        })
    }
  }, [id])

  function mudar(e) {
    setProduto({ ...produto, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()

    const dados = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      quantidadeEstoque: Number(produto.quantidadeEstoque),
      categoria: produto.categoria,
      marca: produto.marca,
      cor: produto.cor,
      codigoBarras: produto.codigoBarras,
      fabricante: produto.fabricante,
      ativo: produto.ativo,
    }
    // a API não aceita número vazio, então só manda se preencheu
    if (produto.peso !== '') dados.peso = Number(produto.peso)
    if (produto.altura !== '') dados.altura = Number(produto.altura)
    if (produto.largura !== '') dados.largura = Number(produto.largura)
    if (produto.profundidade !== '') dados.profundidade = Number(produto.profundidade)

    let url = '/api/produtos'
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
      navigate('/produtos')
    } else {
      const corpo = await res.json()
      setErro(corpo.erros ? corpo.erros.join(', ') : corpo.erro)
    }
  }

  return (
    <div>
      <h1>{id ? 'Editar produto' : 'Novo produto'}</h1>

      <form onSubmit={salvar}>
        <div className="campo">
          <label>Nome *</label>
          <input name="nome" value={produto.nome} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>Descrição</label>
          <input name="descricao" value={produto.descricao} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Preço *</label>
          <input name="preco" type="number" step="any" value={produto.preco} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>Quantidade em estoque *</label>
          <input name="quantidadeEstoque" type="number" value={produto.quantidadeEstoque} onChange={mudar} required />
        </div>
        <div className="campo">
          <label>Categoria</label>
          <input name="categoria" value={produto.categoria} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Marca</label>
          <input name="marca" value={produto.marca} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Cor</label>
          <input name="cor" value={produto.cor} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Peso</label>
          <input name="peso" type="number" step="any" value={produto.peso} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Altura</label>
          <input name="altura" type="number" step="any" value={produto.altura} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Largura</label>
          <input name="largura" type="number" step="any" value={produto.largura} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Profundidade</label>
          <input name="profundidade" type="number" step="any" value={produto.profundidade} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Código de barras</label>
          <input name="codigoBarras" value={produto.codigoBarras} onChange={mudar} />
        </div>
        <div className="campo">
          <label>Fabricante</label>
          <input name="fabricante" value={produto.fabricante} onChange={mudar} />
        </div>
        <div className="campo">
          <label>
            Ativo{' '}
            <input
              type="checkbox"
              checked={produto.ativo}
              onChange={(e) => setProduto({ ...produto, ativo: e.target.checked })}
            />
          </label>
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/produtos">Cancelar</Link>
      </form>
    </div>
  )
}

export default ProdutoForm
