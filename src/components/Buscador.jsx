import React, { useState } from 'react';
import Error from './Error';

const Buscador = ({ setBusqueda }) => {

   const [terminoBusqueda, setTerminoBusqueda] = useState('');
   const [error, setError] = useState(false);

   const handleSubmit = e => {
      e.preventDefault();

      if (terminoBusqueda === '') {
         setError(true);
         return;
      }

      setError(false);
      setBusqueda(terminoBusqueda);
   }

   const componente = (error) ? <Error mensaje="Agrega un término de busqueda" /> : null;

   return (
      <form onSubmit={handleSubmit}>
         <div className="row">
            <div className="form-group col-md-8">
               <input type="text" className="form-control form-control-lg" placeholder="Busca una imágen" onChange={e => setTerminoBusqueda(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
               <input type="submit" className="btn btn-lg btn-info btn-block" value="Buscar" />
            </div>
         </div>

         {componente}
      </form>
   );
}

export default Buscador;
