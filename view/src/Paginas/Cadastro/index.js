import styled from "styled-components"
import {FormularioCadastro, FormularioCadastroCto} from "../../components/FormularioCadastro"


const CadastroEstilizado = styled.main`

`

const Cadastro = () => {
    return <CadastroEstilizado>
        <FormularioCadastro />
        <FormularioCadastroCto />
    </CadastroEstilizado>
}

export default Cadastro