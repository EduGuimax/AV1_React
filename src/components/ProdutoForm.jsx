import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { atualizar, buscar, criar } from '../api'
import { paraApi, paraFormulario } from '../formulario'
import Campo from './Campo'

// Valores iniciais de um produto novo
const produtoVazio = {
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
}

const camposNumericos = ['preco', 'quantidadeEstoque', 'peso', 'altura', 'largura', 'profundidade']

// Serve para as duas telas: /produtos/novo (cadastro) e /produtos/:id/editar (atualização)
export default function ProdutoForm() {
  const { id } = useParams() // só existe na edição
  const navigate = useNavigate()
  const [produto, setProduto] = useState(produtoVazio)
  const [erro, setErro] = useState('')

  // Na edição, busca o produto na API e preenche o formulário
  useEffect(() => {
    if (!id) return
    // "cancelado" evita que uma resposta atrasada apague o que o usuário já digitou
    let cancelado = false
    buscar('produtos', id)
      .then((dados) => {
        if (!cancelado) setProduto(paraFormulario(dados, produtoVazio))
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
    const { name, value, type, checked } = evento.target
    setProduto({ ...produto, [name]: type === 'checkbox' ? checked : value })
  }

  async function salvar(evento) {
    evento.preventDefault() // impede o navegador de recarregar a página
    setErro('')
    try {
      const dados = paraApi(produto, camposNumericos)
      if (id) {
        await atualizar('produtos', id, dados)
      } else {
        await criar('produtos', dados)
      }
      navigate('/produtos') // volta para a lista
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <>
      <h1>{id ? 'Editar produto' : 'Novo produto'}</h1>

      <form onSubmit={salvar}>
        <Campo label="Nome" nome="nome" valor={produto.nome} aoMudar={mudar} obrigatorio />
        <Campo label="Descrição" nome="descricao" valor={produto.descricao} aoMudar={mudar} />
        <Campo label="Preço" nome="preco" tipo="number" valor={produto.preco} aoMudar={mudar} obrigatorio />
        <Campo label="Quantidade em estoque" nome="quantidadeEstoque" tipo="number" valor={produto.quantidadeEstoque} aoMudar={mudar} obrigatorio />
        <Campo label="Categoria" nome="categoria" valor={produto.categoria} aoMudar={mudar} />
        <Campo label="Marca" nome="marca" valor={produto.marca} aoMudar={mudar} />
        <Campo label="Cor" nome="cor" valor={produto.cor} aoMudar={mudar} />
        <Campo label="Peso" nome="peso" tipo="number" valor={produto.peso} aoMudar={mudar} />
        <Campo label="Altura" nome="altura" tipo="number" valor={produto.altura} aoMudar={mudar} />
        <Campo label="Largura" nome="largura" tipo="number" valor={produto.largura} aoMudar={mudar} />
        <Campo label="Profundidade" nome="profundidade" tipo="number" valor={produto.profundidade} aoMudar={mudar} />
        <Campo label="Código de barras" nome="codigoBarras" valor={produto.codigoBarras} aoMudar={mudar} />
        <Campo label="Fabricante" nome="fabricante" valor={produto.fabricante} aoMudar={mudar} />

        <div className="campo">
          <label htmlFor="ativo">Ativo</label>
          <input id="ativo" name="ativo" type="checkbox" checked={produto.ativo} onChange={mudar} />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Salvar</button> <Link to="/produtos">Cancelar</Link>
      </form>
    </>
  )
}
