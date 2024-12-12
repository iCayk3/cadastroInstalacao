import Formulario from '../Formulario'
import TableHorizontal from '../TableHorizontal'
import React, { useState } from 'react';
import useFetch from '../../Services/useFetch';
import './Main.css'

const Main = () => {

    const [refreshTable, setRefreshTable] = useState(false);

    const { data, loading, error } = useFetch(`http://localhost:8080/registros/top5?refresh=${refreshTable}`);
    const [alertMessage, setAlertMessage] = useState(null);

    const salvarEdicao = async (editRowId, formData) => {
        try {
            const response = await fetch(`http://localhost:8080/registros/${editRowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(response)

            if (!response.ok) {
                setAlertMessage(`Erro ao salvar: ${response.message || "Status inválido"}`);
                throw new Error('Erro ao enviar o formulário');
            }

            handleFormSubmit();

        } catch (error) {
            setAlertMessage(`Erro ao salvar: ${error.message}`);
            console.error('Erro na requisição:', error);
        }
    }

    const handleFormSubmit = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <main className='main'>
            <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit} /></section>
            <section className='grid-item'><TableHorizontal
                data={data}
                loading={loading} 
                error={error} 
                aoSalvar={(editRowId, formData) => salvarEdicao(editRowId, formData)}
                alertMessage={alertMessage}
                onclose={() => setAlertMessage(null)}
            /></section>
        </main>
    )
}

export default Main