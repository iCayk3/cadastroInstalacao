import Formulario from '../Formulario'
import TableComponent from '../TableComponent'
import TableHorizontal from '../TableHorizontal'
import React, {useState } from 'react';
import useFetch from '../../Services/useFetch';
import './Main.css'

const Main = () => {

    const [refreshTable, setRefreshTable] = useState(false);

    // Custom hook de fetch que recarrega ao mudar `refreshTable`
    const { data, loading, error } = useFetch(`http://localhost:8080/registros?refresh=${refreshTable}`);

    // Função para atualizar a tabela após o submit do formulário
    const handleFormSubmit = () => {
        setRefreshTable((prev) => !prev); // Muda o estado para forçar o recarregamento
    };

    return (
        <main className='main'>
            <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit}/></section>
            <section className='grid-item'><TableComponent /></section>
            <section className='grid-item'><TableHorizontal data={data} loading={loading} error={error}/></section>
        </main>
    )
}

export default Main