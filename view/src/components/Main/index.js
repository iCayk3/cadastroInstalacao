import Formulario from '../Formulario'
import TableHorizontal from '../TableHorizontal'
import React, {useState } from 'react';
import useFetch from '../../Services/useFetch';
import './Main.css'

const Main = () => {

    const [refreshTable, setRefreshTable] = useState(false);

    // Custom hook de fetch que recarrega ao mudar `refreshTable`
    const { data, loading, error } = useFetch(`http://localhost:8080/registros/top5?refresh=${refreshTable}`);
    const editarRegistro = (id) => {
        console.log(id)
    }
    

    // Função para atualizar a tabela após o submit do formulário
    const handleFormSubmit = () => {
        setRefreshTable((prev) => !prev); // Muda o estado para forçar o recarregamento
    };

    return (
        <main className='main'>
            <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit}/></section>
            <section className='grid-item'><TableHorizontal data={data} loading={loading} error={error} aoEditar={editarRegistro}/></section>
        </main>
    )
}

export default Main