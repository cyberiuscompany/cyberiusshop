document.addEventListener("DOMContentLoaded", () => {
  const productosPorPagina = 9;
  const todos = Array.from(document.querySelectorAll('.producto'));
  const paginacionContainer = document.createElement('div');
  paginacionContainer.className = 'paginacion';
  document.querySelector('.productos').appendChild(paginacionContainer);

  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    todos.forEach((prod, i) => {
      prod.style.display = (i >= inicio && i < fin) ? 'block' : 'none';
    });

    paginacionContainer.innerHTML = '';
    const totalPaginas = Math.ceil(todos.length / productosPorPagina);
    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement('button');
      boton.textContent = i;
      boton.onclick = () => mostrarPagina(i);
      paginacionContainer.appendChild(boton);
    }
  }

  mostrarPagina(1);
});
