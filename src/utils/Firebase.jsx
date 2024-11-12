import { db } from '../firebaseConfig/firebase'
import { collection, addDoc } from 'firebase/firestore'


export const addProductosToFirebase = async(productos) => {
    const productosCollection = collection(db, 'productos')

    try {
        for(let producto of productos) {
            await addDoc(productosCollection, producto)
        }
    } catch(error) {
        console.error('Error al agregar productos a DB', error)
        throw new Error ('Error al agregar productos a la DB')
    }
}