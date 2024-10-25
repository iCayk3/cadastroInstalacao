import React from 'react';
import './TableHorizontal.css'

const TableHorizontal = () => {

    const tableData = [{codigo:5, cto:4, porta:15, olt:"PIRABAS", 
        tecnico:"equipe 01", data:"15/04/2024", procedimento: "Reparo", ctoAntiga:"", localidade:"Pirabas"}]

  return (
    <div className="table-container">
      <h3>Dados Cadastrados</h3>
      {tableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>CTO</th>
              <th>Porta</th>
              <th>OLT</th>
              <th>Técnico</th>
              <th>Data</th>
              <th>Procedimento</th>
              <th>CTO Antiga</th>
              <th>Localidade</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.codigo}</td>
                <td>{row.cto}</td>
                <td>{row.porta}</td>
                <td>{row.olt}</td>
                <td>{row.tecnico}</td>
                <td>{row.data}</td>
                <td>{row.procedimento}</td>
                <td>{row.ctoAntiga}</td>
                <td>{row.localidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum dado cadastrado.</p>
      )}
    </div>
  );
};

export default TableHorizontal;
