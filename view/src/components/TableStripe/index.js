import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import styles from './TableStrip.module.css'
import useFetch from '../../Services/useFetch';


export default function TableStripe({uri}) {

  const {data, loading, error} = useFetch(uri)
  console.log(data)

  return (    
    <section className={styles.tableStrip}>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {data && <Sheet>
        <Table aria-label="striped table" >
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Codigo</th>
              <th>OLT</th>
              <th>CTO&nbsp;</th>
              <th>Porta&nbsp;</th>
              <th>Técnico&nbsp;</th>
              <th>Data&nbsp;</th>
              <th>Procedimento&nbsp;</th>
              <th>CTO Antiga&nbsp;</th>
              <th>Localidade&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((row) => (
              <tr key={row.id}>
                <td>{row.codigo}</td>
                <td>{row.nomeOlt}</td>
                <td>{row.nomeCto}</td>
                <td>{row.porta}</td>
                <td>{row.nomeEquipeTecnica}</td>
                <td>{row.data}</td>
                <td>{row.procedimento}</td>
                <td>{row.ctoAntiga}</td>
                <td>{row.localidade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>}
    </section>

  );
}