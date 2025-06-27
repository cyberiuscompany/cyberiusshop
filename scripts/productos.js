document.addEventListener("DOMContentLoaded", () => {
  const productosPorPagina = 9;
  const todos = Array.from(document.querySelectorAll('.producto'));
  const paginacionContainer = document.createElement('div');
  paginacionContainer.className = 'paginacion';
  document.querySelector('.productos').appendChild(paginacionContainer);

  const buscador = document.getElementById("buscador");
  const filtroTipo = document.getElementById("filtroTipo");

  let productosFiltrados = [...todos];

  function filtrarProductos() {
    const texto = buscador.value.toLowerCase();
    const tipoSeleccionado = filtroTipo.value;

    productosFiltrados = todos.filter(producto => {
      const nombre = producto.querySelector("h3").textContent.toLowerCase();
      const descripcion = producto.querySelector("p").textContent.toLowerCase();
      const etiquetas = Array.from(producto.querySelectorAll(".etiqueta")).map(e => e.textContent);

      const coincideTexto = nombre.includes(texto) || descripcion.includes(texto);
      const coincideTipo = tipoSeleccionado === "todos" || etiquetas.includes(tipoSeleccionado);

      return coincideTexto && coincideTipo;
    });

    mostrarPagina(1);
  }

  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    todos.forEach(p => p.style.display = "none");

    productosFiltrados.slice(inicio, fin).forEach(p => {
      p.style.display = "block";
    });

    renderizarPaginacion(productosFiltrados.length, pagina);
  }

  function renderizarPaginacion(total, paginaActual) {
    paginacionContainer.innerHTML = '';
    const totalPaginas = Math.ceil(total / productosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement('button');
      boton.textContent = i;
      if (i === paginaActual) boton.style.fontWeight = 'bold';
      boton.onclick = () => mostrarPagina(i);
      paginacionContainer.appendChild(boton);
    }
  }

  buscador.addEventListener("input", filtrarProductos);
  filtroTipo.addEventListener("change", filtrarProductos);

  mostrarPagina(1);
});
document.querySelector('.visorGaleria').classList.remove('visible');
