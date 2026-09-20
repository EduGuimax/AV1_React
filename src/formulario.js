// Funções auxiliares para os formulários.

// A API devolve null nos campos vazios, mas o <input> não aceita null.
// Aqui copiamos só os campos do formulário (modelo), trocando null por ''.
export function paraFormulario(registro, modelo) {
  const valores = {}
  for (const campo in modelo) {
    valores[campo] = registro[campo] ?? ''
  }
  return valores
}

// Prepara os dados para enviar à API: tira os campos vazios
// e converte para número os campos numéricos (o <input> sempre dá texto).
export function paraApi(valores, camposNumericos = []) {
  const dados = {}
  for (const campo in valores) {
    if (valores[campo] === '') continue
    dados[campo] = camposNumericos.includes(campo) ? Number(valores[campo]) : valores[campo]
  }
  return dados
}
