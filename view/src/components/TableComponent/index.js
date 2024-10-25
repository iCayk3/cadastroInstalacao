import './TableComponent.css'

const TableComponent = () => {
    const data = [
        { instalacao: 20, mudancaEndereco: 28, reparo: 40, trocaEquipamento: 18, cancelamento: 8, reativacao: 14, migracao: 4 },
    ];

    return (
        <div className='tablecomponent'>
            <table>
                <tbody>
                    <tr>
                        <th>Instalacao</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.instalacao}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Mudança de endereco</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.mudancaEndereco}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Reparo</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.reparo}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Troca de equipamento</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.trocaEquipamento}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Cancelamento</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.cancelamento}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Reativação</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.reativacao}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Migração</th>
                        {data.map((item, index) => (
                            <td key={index}>{item.migracao}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default TableComponent;
