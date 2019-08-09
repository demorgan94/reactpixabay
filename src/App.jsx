import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import axios from 'axios';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imagenesPerPage = 30;
      const key = '12848979-472c011a560f52c7b7cfdaeeb';

      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPerPage}&page=${paginaActual}`;

      const res = await axios.get(url);

      setImagenes(res.data.hits);

      const calcularTotalPaginas = Math.ceil(res.data.totalHits / imagenesPerPage);
      setTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    let nuevaPaginaAnterior = paginaActual - 1;

    setPaginaActual(nuevaPaginaAnterior);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;

    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="App container-fluid p-0">
      <div className="jumbotron">
        <div className="container">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador setBusqueda={setBusqueda} />
        </div>
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaActual === 1) ? null : (<button onClick={paginaAnterior} type="button" className="btn btn-primary mr-1">&laquo; Anterior</button>)}
        {(paginaActual === totalPaginas) ? null : (<button onClick={paginaSiguiente} type="button" className="btn btn-primary">Siguiente &raquo;</button>)}
      </div>
    </div>
  );
}

export default App;
