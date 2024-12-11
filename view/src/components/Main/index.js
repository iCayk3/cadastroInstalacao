import Formulario from '../Formulario'
import TableHorizontal from '../TableHorizontal'
import React, { useState } from 'react';
import useFetch from '../../Services/useFetch';
import './Main.css'
import AlertApp from '../AlertApp';

const Main = () => {

    const [refreshTable, setRefreshTable] = useState(false);

    const { data, loading, error } = useFetch(`http://localhost:8080/registros/top5?refresh=${refreshTable}`);
    
    const salvarEdicao = async (editRowId, formData) => {
        try {
            const response = await fetch(`http://localhost:8080/registros/${editRowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Converte os dados do formulário em JSON
            });

            handleFormSubmit();

            if (!response.ok) {
                throw new Error('Erro ao enviar o formulário');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            <AlertApp severity={"error"} texto={"Erro ao atualizar"}/>
            //alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
        }
    } 

    const handleFormSubmit = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <main className='main'>
            <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit} /></section>
            <section className='grid-item'><TableHorizontal data={data} loading={loading} error={error} aoSalvar={(editRowId, formData) => salvarEdicao(editRowId, formData)} /></section>
        </main>
    )
}

export default Main