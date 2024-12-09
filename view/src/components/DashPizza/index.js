import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { valueFormatter } from './DataFet';
import useFetch from '../../Services/useFetch';
import styles from './DashPizza.module.css'

export default function DashPizza() {

  const { data, loading, error } = useFetch('http://localhost:8080/registros/servicos/tecnicos/mensal/resumo')

  return (
    <section className={styles.dashPizza}>
      {error && <p>Erro ao solicitar: {error}</p>}
      {loading && <p>Carregando...</p>}
      {data && data.map((dados) => (
        <>
          <div className={styles.itens}>
            <h4>{dados.nome}</h4>
            <PieChart key={data.id}
              series={[
                {
                  data: dados.servicos,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter,
                },
              ]}
              height={280} /></div></>
      ))}
    </section >

  );
}