import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>CRUD com React</h1>
      <p>Escolha um cadastro:</p>
      <ul>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/tarefas">Tarefas</Link></li>
      </ul>
    </>
  )
}
