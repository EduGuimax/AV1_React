// Um campo do formulário: rótulo + input
export default function Campo({ label, nome, valor, aoMudar, tipo = 'text', obrigatorio = false }) {
  return (
    <div className="campo">
      <label htmlFor={nome}>
        {label}
        {obrigatorio && ' *'}
      </label>
      <input
        id={nome}
        name={nome}
        type={tipo}
        value={valor}
        onChange={aoMudar}
        required={obrigatorio}
        step={tipo === 'number' ? 'any' : undefined}
      />
    </div>
  )
}
