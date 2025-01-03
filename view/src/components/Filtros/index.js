import BasicDatePicker from "../BasicDatePicker";
import FieldAutoComplet from "../FieldAutoComplet";
import FloatingLabelInput from "../FloatingLabelInput";
import styled from "styled-components";

const DivFiltroEstilizada = styled.div`
        margin-bottom: 8px;
        background-color: #fff;
        padding: 8px;
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: auto;
        gap: 40px;
        justify-content: center;
        align-items: center;

        .gridItem:nth-child(1){
            grid-column: span 4;
            /* Item 3 ocupa as 2 colunas */
        }
        .gridItem:nth-child(3){
            margin-bottom: 0.5rem;
        }
`

export default function Filtros({ aoAlteradoTecnico, aoAlteradoData, aoAlteradoCliente, aoAlteradoTecnicoLabel, valor, valorInput }) {

    const apiUrl = process.env.REACT_APP_API_URL;

    function selectData(value) {
        if (value === null) {
            aoAlteradoData('')
        } else {
            try {
                aoAlteradoData(value.toISOString().slice(0, 10))
            } catch (e) {
                aoAlteradoData('')
            }

        }
    }

    function selectCliente(value) {
        if (value === null) {
            aoAlteradoCliente('')
        } else {
            aoAlteradoCliente(value)
        }
    }

    return (
        <DivFiltroEstilizada >
            <h3 className="gridItem">Filtros</h3>
            <div className="gridItem">
                <FloatingLabelInput
                    labelProp={"Código"}
                    placeholderProp={"Informé o código para pesquisa"}
                    sx={{ '--Input-minHeight': '56px', '--Input-radius': '6px' }}
                    aoAlterado={(value) => selectCliente(value)}
                />
            </div>
            <div className="gridItem">
                <BasicDatePicker aoAlterado={(value) => selectData(value)} label={"Selecione a data"} />
            </div>
            <div className="gridItem">
                <FieldAutoComplet
                    valor={valor}
                    inputValue={valorInput}
                    uri={`${apiUrl}/tecnico/equipes`} 
                    label={"Técnicos"} 
                    aoAlterado={aoAlteradoTecnico}
                    onInputValueChange={aoAlteradoTecnicoLabel} />
            </div>
        </DivFiltroEstilizada>
    )
}