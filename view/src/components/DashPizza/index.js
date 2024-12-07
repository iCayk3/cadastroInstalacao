import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './DataFet';
import useFetch from '../../Services/useFetch';

export default function DashPizza() {

  const [dados, setDados] = React.useState([])
  const { data, loading, error } = useFetch('http://localhost:8080/registros/servicos/mensais/resumo')
  


  return (
    <div>
      <h2>Serviços por Equipe</h2>
      <PieChart
        series={[
          {
            data: desktopOS,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter,
          },
        ]}
        height={200}
      />
    </div>

  );
}