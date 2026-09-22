/* Mis Finanzas Pro v2.1 - conceptos inteligentes */
const FINANCE_CONCEPTS = {
  Egreso: [
    'Transporte','Alimentación','Mercado y hogar','Vivienda y arriendo',
    'Servicios públicos','Salud','Deporte y bienestar','Vestuario y calzado',
    'Educación','Entretenimiento','Cuidado personal','Familia e hijos',
    'Mascotas','Tecnología','Deudas y créditos','Seguros','Impuestos',
    'Mantenimiento y reparaciones','Viajes','Regalos y donaciones','Otros gastos'
  ],
  Ingreso: [
    'Salario','Honorarios','Trabajo independiente','Ventas','Bonificaciones',
    'Comisiones','Rendimientos e intereses','Arriendos recibidos',
    'Reembolsos','Regalos recibidos','Otros ingresos'
  ]
};

function actualizarConceptosFinancieros(conservarActual = true) {
  const tipo = document.getElementById('movementType');
  const campo = document.getElementById('movementCategory');
  const lista = document.getElementById('categoryOptions');
  if (!tipo || !campo || !lista) return;
  const actual = conservarActual ? campo.value : '';
  const predefinidos = FINANCE_CONCEPTS[tipo.value] || [];
  let historicos = [];
  try {
    const guardado = JSON.parse(localStorage.getItem('mfp_v2_data') || '{}');
    historicos = (guardado.movements || [])
      .filter(x => x.type === tipo.value && x.category)
      .map(x => x.category);
  } catch (_) {}
  const conceptos = [...new Set([...predefinidos, ...historicos])];
  lista.innerHTML = conceptos.map(x => `<option value="${x}"></option>`).join('');
  campo.placeholder = tipo.value === 'Ingreso' ? 'Selecciona o escribe un ingreso' : 'Selecciona o escribe un gasto';
  campo.value = actual;
}

document.addEventListener('DOMContentLoaded', () => {
  const tipo = document.getElementById('movementType');
  if (tipo) tipo.addEventListener('change', () => actualizarConceptosFinancieros(false));
  actualizarConceptosFinancieros();
});
