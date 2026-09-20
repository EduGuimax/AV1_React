import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProdutosLista from './components/ProdutosLista'
import ProdutoForm from './components/ProdutoForm'
import ClientesLista from './components/ClientesLista'
import ClienteForm from './components/ClienteForm'
import TarefasLista from './components/TarefasLista'
import TarefaForm from './components/TarefaForm'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/tarefas">Tarefas</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/produtos" element={<ProdutosLista />} />
          <Route path="/produtos/novo" element={<ProdutoForm />} />
          <Route path="/produtos/:id/editar" element={<ProdutoForm />} />

          <Route path="/clientes" element={<ClientesLista />} />
          <Route path="/clientes/novo" element={<ClienteForm />} />
          <Route path="/clientes/:id/editar" element={<ClienteForm />} />

          <Route path="/tarefas" element={<TarefasLista />} />
          <Route path="/tarefas/novo" element={<TarefaForm />} />
          <Route path="/tarefas/:id/editar" element={<TarefaForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
