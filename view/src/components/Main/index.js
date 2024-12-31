import Formulario from '../Formulario'
import TableHorizontal from '../TableHorizontal'
import React, { useState } from 'react';
import useFetch from '../../Services/useFetch';
import './Main.css'

const Main = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const procedimentos = [{
        id: "INSTALACAO",
        label: "INSTALAÇÃO"
      },
      {
        id: "MUDANCA_ENDERECO",
        label: "MUDANÇA DE ENDEREÇO"
      },
      {
        id: "REPARO",
        label: "REPARO"
      },
      {
        id: "TROCA_EQUIPAMENTO",
        label: "TROCA DE EQUIPAMENTO"
      },
      {
        id: "CANCELAMENTO",
        label: "CANCELAMENTO"
      },
      {
        id: "REATIVACAO",
        label: "REATIVAÇÃO"
      },
      {
        id: "MIGRACAO",
        label: "MIGRAÇÃO"
      }
      ]

    const [refreshTable, setRefreshTable] = useState(false);

    const { data, loading, error } = useFetch(`${apiUrl}/registros/top5?refresh=${refreshTable}`);
    const [alertMessage, setAlertMessage] = useState(null);

    const salvarEdicao = async (editRowId, formData) => {
        try {
            const response = await fetch(`${apiUrl}/registros/${editRowId}`, {
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
            <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit} procedimentos={procedimentos}/></section>
            <section className='grid-item'><TableHorizontal
                procedimentos={procedimentos}
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