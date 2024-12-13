import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useFetch from '../../Services/useFetch';
import styles from './DashPizza.module.css'

export default function DashPizza({ filtro }) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const { data, loading, error } = useFetch(`${apiUrl}/registros/servicos/tecnicos/mensal/resumo?filtro=${filtro}`)

  return (
    <div className={styles.dashPizza}>
      {error && <p>Erro ao solicitar: {error}</p>}
      {loading && <p>Carregando...</p>}
      {data && data.map((dados, index) => (
        <div key={index} className={styles.itens}>
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
    </div>
  );
}