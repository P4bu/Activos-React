import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import  CreateProduct  from './CreateProduct'

import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { ExportExcel } from '../utils/ExportExcel'; 

const MySwal = withReactContent(Swal)

const ShowProduct = () => {

    // configura hooks
    const [productos, setProductos] = useState( [] )
    const navigate = useNavigate()

    // referencia a la DB
    const productosCollection = collection(db, "productos")

    // funcion para mostra todos los datos
    const getProductos = async() => {
        const data = await getDocs(productosCollection)
        setProductos(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
        console.log('Productos', productos)
    }

    // effect
    useEffect(() => {
        getProductos()
    }, [])

    // funcion para fechas 
    const formatDate = (timestamp) => {
        if(timestamp && timestamp.toDate) {
            const date = timestamp.toDate()
            return date.toLocaleDateString()
        }
        return ''
    }

    const handleProductCreated = () => {
        // Redirige a la página principal después de crear el producto
        navigate('/');
      }
      
     // Mostrar el formulario para agregar producto
     const agregarProducto = () => {
        
        MySwal.fire({
            title: "Crear Producto",
            html: (
                 <CreateProduct onProductCreated={() => navigate('/')} />
            ),
            focusConfirm: false,
            showCancelButton: false,
            showConfirmButton: false,
            cancelButtonText: '',
            confirmButtonText: '',
            preConfirm: () => {
            },
        });
    };

    // funcion para eliminar
    const deleteProducto = async (id) => {
        const productoDoc = doc(db, "productos", id)
        await deleteDoc(productoDoc)
        getProductos()
    }
    // agregar salida
    const agregarSalida = (producto) => {
        MySwal.fire({
            title: 'Agregar Salida',
            html: `
                <form id="form-salida" key=${producto.id}>
                    <!-- Campo Asignado, editable -->
                    <label for="asignadoA">Asignado:</label>
                    <input type="text" id="asignadoA" class="swal2-input" value="${producto.asignadoA || ''}" enable />
                    
                    <!-- Campo Producto, no editable -->
                    <label for="producto">Producto:</label>
                    <input type="text" id="producto" class="swal2-input" value="${producto.marca} ${producto.modelo}" disabled />

                    <!-- Campo Fecha de Salida, editable -->
                    <label for="fecha_utilizado">Fecha de Salida:</label>
                    <input type="date" id="fecha_utilizado" class="swal2-input" value="${new Date().toISOString().split('T')[0]}" required />
                    
                    <!-- Campo OT (Orden de Trabajo), editable -->
                    <label for="ot">OT (Orden de Trabajo):</label>
                    <input type="text" id="ot" class="swal2-input" placeholder="Número de OT" required />
                    
                    <!-- Campo Detalle, editable -->
                    <label for="detalle">Detalle:</label>
                    <input type="text" id="detalle" class="swal2-input" placeholder="Detalles adicionales" required />
                    
                    <!-- Campo Ticket, no editable, se genera automáticamente -->
                    <label for="ticket">Ticket:</label>
                    <input type="text" id="ticket" class="swal2-input" value="TICKET-${Date.now()}" disabled />
                </form>
            `,
            focusConfirm: true,
            preConfirm: (id) => {
                const formData = {
                    asignadoA: document.getElementById('asignadoA').value, 
                    producto: `${producto.marca} ${producto.modelo}`,  
                    fecha_utilizado: document.getElementById('fecha_utilizado').value,  
                    ot: document.getElementById('ot').value,  
                    detalle: document.getElementById('detalle').value, 
                    ticket: document.getElementById('ticket').value,  
                };
                console.log(formData);
            }
        });
    }

    // SweetAlert
    const confirmDelete = (id) => {
        MySwal.fire({
            title: "¿Estas seguro?",
            text: "No podras revertir este cambio",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id)
              Swal.fire({
                title: "Eliminado",
                text: "Tu producto a sido eliminado",
                icon: "success"
            })
            }
          })
    }

    


    return(
        <>
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <button onClick={agregarProducto} className='btn btn-success mt-2 mb-2'>Añadir Activo</button>
                </div>
                <button 
                    onClick={() => ExportExcel(productos)} 
                    className='btn btn-primary mt-2 mb-2'>
                    Exportar a Excel
                </button>
                <table className='table table-light table-hover'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Serie</th>
                            <th>Activo fijo</th>
                            <th>Descripción</th>
                            <th>Sector</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { productos.map( (producto) => {
                            return (
                                <tr key={producto.id}>
                                    <td>{formatDate(producto.fecha)}</td>
                                    <td>{producto.marca}</td>
                                    <td>{producto.modelo}</td>
                                    <td>{producto.serie}</td>
                                    <td>{producto.activo_fijo}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.sector}</td>
                                    <td>{producto.estado}</td>
                                    <td>
                                        <Link to={`/EditProduct/${producto.id}`} className='btn btn-warning'><i class="fa-solid fa-pen-to-square">Editar</i></Link>
                                        <button onClick={() => confirmDelete(producto.id)} class='btn btn-danger'>Eliminar</button>
                                        <button onClick={() => agregarSalida(producto.id)} class='btn btn-success'>Salida</button>
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>

            </div>    
        </div>
    </div>
        </>
    )

}

export default ShowProduct
