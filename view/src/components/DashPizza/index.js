import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useFetch from '../../Services/useFetch';
import styled from 'styled-components';

const DivDashEstilizada = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .itens {
        position: relative;
        align-items: center;
        border-radius: 10px;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
        margin: 8px;
        height: 22.5rem;
    }
    @media only screen and (max-width: 1438px) {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
    @media only screen and (max-width: 998px) {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
    @media only screen and (max-width: 768px) {

      .itens rect {
          display: none;
      }

      .itens tspan{
        display: none;      
      }
    }
    @media only screen and (max-width: 600px) {
      .itens rect {
          display: none;
      }

      .itens tspan{
        display: none;      
      }
    }

  `
  const apiUrl = process.env.REACT_APP_API_URL;

export default function DashPizza({ filtro }) {

  const { data, loading, error } = useFetch(`${apiUrl}/registros/servicos/tecnicos/mensal/resumo?filtro=${filtro}`)

  return (
    <DivDashEstilizada>
      {error && <p>Erro ao solicitar: {error}</p>}
      {loading && <p>Carregando...</p>}
      {data && data.map((dados, index) => (
        <div key={index} className="itens">
          <h4>{dados.nome}</h4>
          <PieChart
            series={[
              {
                data: dados.servicos,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
              },
            ]}
            height={280} /></div>
      ))}
    </DivDashEstilizada>
  );
}