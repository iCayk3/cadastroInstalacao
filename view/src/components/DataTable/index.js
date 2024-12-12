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

export default function DataTable({filtro}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [dataFiltro, setDataFiltro] = React.useState('');
  const [tecnico, setTecnico] = React.useState('');
  const { data, loading, error } = useFetch(`${apiUrl}/registros?filtro=${filtro}`);

  const aoAlteradoTecnico = (tecnico) => {
    if (tecnico === null) {
      setTecnico(data)
    } else {
      setTecnico(tecnico)
    }
  }

  const aoAlteradoData = (dataFiltro) => {
    if (dataFiltro === null) {
      setDataFiltro('')
    } else {
      setDataFiltro(dataFiltro)
    }
  }

  return (
    <div>
      <Filtros 
        aoAlteradoTecnico={(tecnico) => aoAlteradoTecnico(tecnico)} 
        aoAlteradoData={(data) => aoAlteradoData(data)}
        />
      <Paper sx={{ height: 400, width: '100%' }}>

        {loading && <p>Carregando</p>}
        {error && <p>Erro na requisicao: {error}</p>}
        {!dataFiltro && tecnico && <DataGrid
            key={data.id}
            rows={data.filter((item) => item.nomeEquipeTecnica === tecnico)}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}
        {!tecnico && dataFiltro && <DataGrid
            key={data.id}
            rows={data.filter((item) => item.data === dataFiltro)}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}
        {!tecnico && !dataFiltro && data &&
          <DataGrid
            key={data.id}
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}
          {tecnico && dataFiltro &&  <DataGrid
            key={data.id}
            rows={data.filter((item) => {return item.data === dataFiltro && item.nomeEquipeTecnica === tecnico})}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15]}
            sx={{ border: 0 }}

          />}
      </Paper>
    </div >

  );
}