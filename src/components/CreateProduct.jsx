import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CreateProduct = ({ onProductCreated }) => {
  const [activo_fijo, setActivo_fijo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [sector, setSector] = useState('');
  const [serie, setSerie] = useState('');

  const productoCollection = collection(db, 'productos');

  const store = async (data) => {
    const timestamp = data.fecha ? Timestamp.fromDate(new Date(data.fecha)) : null;

    try {
      await addDoc(productoCollection, {
        activo_fijo: data.activo_fijo,
        descripcion: data.descripcion,
        estado: data.estado,
        fecha: timestamp,
        marca: data.marca,
        modelo: data.modelo,
        sector: data.sector,
        serie: data.serie,
      });

      Swal.fire('Producto creado!', '', 'success');
      
      // Llamar a la función onProductCreated después de crear el producto
      onProductCreated();

      // Cerrar el modal
      MySwal.close();
    } catch (error) {
      console.error('Hubo un error', error);
      Swal.fire('Error', 'Hubo un problema al guardar el producto. Inténtalo de nuevo.', 'error');
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        const formData = { activo_fijo, descripcion, estado, fecha, marca, modelo, sector, serie };
        store(formData);
      }} 
      className="p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: '800px', margin: '20px auto' }}
    >
     
      
      <div className="mb-3">
        <label htmlFor="marca" className="form-label">Marca</label>
        <input 
          type="text" 
          id="marca" 
          className="form-control" 
          value={marca} 
          onChange={(e) => setMarca(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="modelo" className="form-label">Modelo</label>
        <input 
          type="text" 
          id="modelo" 
          className="form-control" 
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="serie" className="form-label">Serie</label>
        <input 
          type="text" 
          id="serie" 
          className="form-control" 
          value={serie} 
          onChange={(e) => setSerie(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <input 
          type="text" 
          id="estado" 
          className="form-control" 
          value={estado} 
          onChange={(e) => setEstado(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="activo_fijo" className="form-label">Activo Fijo</label>
        <input 
          type="text" 
          id="activo_fijo" 
          className="form-control" 
          value={activo_fijo} 
          onChange={(e) => setActivo_fijo(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <input 
          type="text" 
          id="descripcion" 
          className="form-control" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input 
          type="date" 
          id="fecha" 
          className="form-control" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sector" className="form-label">Sector</label>
        <input 
          type="text" 
          id="sector" 
          className="form-control" 
          value={sector} 
          onChange={(e) => setSector(e.target.value)} 
          required 
        />
      </div>

      <button type="submit" className="btn btn-success w-100">Crear Producto</button>
    </form>
  );
};

export default CreateProduct;
