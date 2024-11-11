import { useState, useEffect } from "react";
import { getDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import { db } from "../firebaseConfig/firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditProduct = ({ id, getProductos }) => {
    const [activo_fijo, setActivo_fijo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [fecha, setFecha] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [sector, setSector] = useState('');
    const [serie, setSerie] = useState('');



    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, 'productos', id)

        const timestamp = fecha ? Timestamp.fromDate(new Date(fecha)) : null;

        try {
            const data = {
                activo_fijo: activo_fijo,
                descripcion: descripcion,
                estado: estado,
                fecha: timestamp,
                marca: marca,
                modelo: modelo,
                sector: sector,
                serie: serie,
            }
            await updateDoc(product, data)

            Swal.fire('¡Activo editado con exito!', 'Su activo fue actualizado con exito', 'success');

            // Llamar a la función onProductCreated después de crear el producto
            getProductos();

        } catch (error) {
            console.error('Hubo un error', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el producto. Inténtalo de nuevo.', 'error');
        }

    }

    const getProductoById = async (id) => {
        const product = await getDoc(doc(db, 'productos', id))

        if (product.exists()) {
            const data = product.data()

            if (data.fecha instanceof Timestamp) {
                console.log("Fecha existe")
                const localDate = data.fecha.toDate()
                const localISOString = localDate.toISOString().split('T')[0]
                setFecha(localISOString)
            } else {
                console.log("Fecha no existe")
                setFecha('')
            }

            setActivo_fijo(data.activo_fijo)
            setDescripcion(data.descripcion)
            setEstado(data.estado)
            setMarca(data.marca)
            setModelo(data.modelo)
            setSector(data.sector)
            setSerie(data.serie)
        }
    }

    useEffect(() => {
        getProductoById(id)
    }, [])

    return (
        <form
            onSubmit={update}
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

            <button type="submit" className="btn btn-success w-100">Editar Producto</button>


        </form>
    )

};

export default EditProduct;