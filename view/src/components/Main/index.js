import Formulario from '../Formulario'
import TableHorizontal from '../TableHorizontal'
import React, { useState } from 'react';
import useFetch from '../../Services/useFetch';
import styled from 'styled-components';

const MainEstilizado = styled.main`
    position: relative;
    margin: 0 8%;
    width: 85%;
    gap: 10px;
    box-sizing: border-box;

    .grid-item {
      margin-top: 20px;
      background-color: #f2f2f2;
      padding: 20px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-sizing: border-box;
    }
    
  @media only screen and (max-width: 1300px) {
    table td:nth-child(9),
    table th:nth-child(9) {
    display: none;
    }
    table td:nth-child(11),
    table th:nth-child(11) {
    display: none;
    }
  }
  @media only screen and (max-width: 1090px) {
    table td:nth-child(1),
    table th:nth-child(1) {
    display: none;
    }
    table td:nth-child(9),
    table th:nth-child(9) {
    display: none;
    }
    table td:nth-child(11),
    table th:nth-child(11) {
    display: none;
    }
    table td:nth-child(10),
    table th:nth-child(10) {
    display: none;
    }
  }
  @media only screen and (max-width: 984px) {
    table td:nth-child(1),
    table th:nth-child(1) {
    display: none;
    }
    table td:nth-child(9),
    table th:nth-child(9) {
    display: none;
    }
    table td:nth-child(11),
    table th:nth-child(11) {
    display: none;
    }
    table td:nth-child(10),
    table th:nth-child(10) {
    display: none;
    }
    table td:nth-child(3),
    table th:nth-child(3) {
    display: none;
    }
    table td:nth-child(4),
    table th:nth-child(4) {
    display: none;
    }
    table td:nth-child(5),
    table th:nth-child(5) {
    display: none;
    }
  }
  
  @media only screen and (max-width: 600px) {
    table td:nth-child(1),
    table th:nth-child(1) {
    display: none;
    }
    table td:nth-child(9),
    table th:nth-child(9) {
    display: none;
    }
    table td:nth-child(11),
    table th:nth-child(11) {
    display: none;
    }
    table td:nth-child(10),
    table th:nth-child(10) {
    display: none;
    }
    table td:nth-child(3),
    table th:nth-child(3) {
    display: none;
    }
    table td:nth-child(4),
    table th:nth-child(4) {
    display: none;
    }
    table td:nth-child(5),
    table th:nth-child(5) {
    display: none;
    }
    table td:nth-child(7),
    table th:nth-child(7) {
    display: none;
    }
  }

  `

const apiUrl = process.env.REACT_APP_API_URL;

const Main = () => {

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
  const [alertMessage, setAlertMessage] = useState(false);

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

  const exibiralerta = (event) => {
    setAlertMessage(event)
  }

  return (
    <MainEstilizado>
      <section className='grid-item'><Formulario onFormSubmit={handleFormSubmit} procedimentos={procedimentos} onclose={() => exibiralerta(false)} /></section>
      <section className='grid-item'><TableHorizontal
        procedimentos={procedimentos}
        data={data}
        loading={loading}
        error={error}
        aoSalvar={(editRowId, formData) => salvarEdicao(editRowId, formData)}
        alertMessage={alertMessage}
        onclose={() => exibiralerta(false)}
      /></section>
    </MainEstilizado>
  )
}

export default Main