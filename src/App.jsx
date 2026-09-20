import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProdutosLista from './components/ProdutosLista'
import ProdutoForm from './components/ProdutoForm'
import ClientesLista from './components/ClientesLista'
import ClienteForm from './components/ClienteForm'
import TarefasLista from './components/TarefasLista'
import TarefaForm from './components/TarefaForm'

function App() {
  return (
    <>
      <nav>
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
        <NavLink to="/tarefas">Tarefas</NavLink>
      </nav>

      <main>
        {/* Cada Route liga um endereço (path) a um componente (element) */}
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

          <Route path="*" element={<p>Página não encontrada.</p>} />
        </Routes>
      </main>
    </>
  )
}

export default App
