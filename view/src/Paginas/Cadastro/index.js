import styled from "styled-components"
import {FormularioCadastro, FormularioCadastroCto, FormularioCadastroEquipeTecnica, FormularioCadastroTecnico} from "../../components/FormularioCadastro"


const CadastroEstilizado = styled.main`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`

const Cadastro = () => {
    return <CadastroEstilizado>
        <FormularioCadastro />
        <FormularioCadastroEquipeTecnica />
        <FormularioCadastroCto />       
        <FormularioCadastroTecnico />
        
    </CadastroEstilizado>
}

export default Cadastro