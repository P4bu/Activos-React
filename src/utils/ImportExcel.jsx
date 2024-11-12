import * as XLSX from 'xlsx'
import { addProductosToFirebase } from './Firebase' 
import Swal from 'sweetalert2';

export const handleFileChange = (e, setProductos) => {
    // Obtiene el archivo seleccionado
    const file = e.target.files[0] 

    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
        const reader = new FileReader()

        reader.onload = (event) => {
            const ab = event.target.result
            // Lee el archivo Excel
            const wb = XLSX.read(ab, { type: 'array' }) 
            // Selecciona la primera hoja
            const ws = wb.Sheets[wb.SheetNames[0]]

            // Convertimos la hoja a un array de arrays
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 })  
            const productos = data.slice(1).map(row => {
                // Mapea cada fila a un objeto con la estructura de producto
                return {
                    fecha: row[0] || "",
                    marca: row[1] || "",
                    modelo: row[2] || "",
                    serie: row[3] || "",
                    activo_fijo: row[4] || "",
                    descripcion: row[5] || "",
                    sector: row[6] || "",
                    estado: row[7] || "",
                };
            });
            
            console.log('Productos importados: ', productos)

            // Actualiza el estado con los productos importados
            setProductos(productos)  
        };
        // Lee el archivo como ArrayBuffer
        reader.readAsArrayBuffer(file)
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor selecciona un archivo Excel válido',
        })
    }
}

export const handleImportExcel = async (productos) => {
    try {
        // Llamamos a la función que sube los productos a Firebase
        await addProductosToFirebase(productos)

        // Si todo va bien, mostramos un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Productos Importados!',
            text: 'Los productos han sido importados correctamente.',
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un error al importar los productos a Firebase.',
        })
    }
}
