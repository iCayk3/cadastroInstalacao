import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import useFetch from '../../Services/useFetch';
import Filtros from '../Filtros';

const columns = [
  { field: 'codigo', headerName: 'CODIGO', width: 80 },
  { field: 'nomeOlt', headerName: 'OLT', width: 150 },
  { field: 'nomeCto', headerName: 'CTO', width: 130 },
  { field: 'porta', headerName: 'PORTA', width: 70 },
  { field: 'nomeEquipeTecnica', headerName: 'Equipe técnica', width: 250 },
  { field: 'data', headerName: 'DATA', width: 100 },
  { field: 'procedimento', headerName: 'Procedimento', width: 130 },
  { field: 'ctoAntiga', headerName: 'CTO Antiga', width: 130 },
  { field: 'localidade', headerName: 'Localidade', width: 130 },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {

  const { data, loading, error } = useFetch('http://localhost:8080/registros');
  const [dataFiltro, setDataFiltro] = React.useState('');
  const [tecnico, setTecnico] = React.useState('');

  const aoAlteradoTecnico = (tecnico) => {
    if (tecnico === null) {
      setTecnico('')
    } else {
      console.log(tecnico)
      setTecnico(tecnico)
    }
  }


  tecnico && console.log(data.filter((item) => item.nomeEquipeTecnica === tecnico))

  return (
    <div>
      <Filtros aoAlteradoTecnico={(tecnico) => aoAlteradoTecnico(tecnico)}/>
      <Paper sx={{ height: 400, width: '100%' }}>

        {loading && <p>Carregando</p>}
        {error && <p>Erro na requisicao: {error}</p>}
        {tecnico && <DataGrid
            key={data.id}
            rows={data.filter((item) => item.nomeEquipeTecnica === tecnico)}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}
        {data &&
          <DataGrid
            key={data.id}
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}

      </Paper>
    </div >

  );
}