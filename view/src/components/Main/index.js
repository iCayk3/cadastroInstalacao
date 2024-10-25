import Formulario from '../Formulario'
import TableComponent from '../TableComponent'
import TableHorizontal from '../TableHorizontal'
import './Main.css'

const Main = () => {
    return (
        <main className='main'>
            <section className='grid-item'><Formulario/></section>
            <section className='grid-item'><TableComponent /></section>
            <section className='grid-item'><TableHorizontal /></section> 
        </main>
    )
}

export default Main