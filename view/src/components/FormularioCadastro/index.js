import styled from "styled-components"
import FloatingLabelInput from "../FloatingLabelInput"
import FieldAutoComplet from "../FieldAutoComplet"
import { useState } from "react"


const FormularioEstiizado = styled.section`
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 20px;

    .botao {
        width: 100%;
        padding: 10px;
        background-color: #1E3CE1;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px
    }
`

const apiUrl = process.env.REACT_APP_API_URL;

const FormularioCadastro = () => {

    const [nome, setNome] = useState('');

    const cadastrarOlt = async () => {

        const formData = {
            nome
        }

        try {
            const response = await fetch(`${apiUrl}/olt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar o formulário');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
        }

    }

    return <FormularioEstiizado>
        <h1>Cadastro de OLT</h1>
        <form onSubmit={cadastrarOlt}>
            <FloatingLabelInput
                valor={nome}
                aoAlterado={(evento) => setNome(evento.target.value)}
                obrigatorio
                labelProp={"Nome da OLT"}
                placeholderProp={"Informe o nome da OLT"}
            />
            <button className="botao" type="submit" >Cadastrar</button>
        </form>
    </FormularioEstiizado>
}

const FormularioCadastroCto = () => {

    const [olt, setOlt] = useState('');
    const [oltInput, setOltInput] = useState('')

    return <FormularioEstiizado>
        <h1>Cadastro de CTO</h1>
        <form>
            <FieldAutoComplet
                uri={`${apiUrl}/olt`}
                label={"OLT"}
                aoAlterado={setOlt}
                onInputValueChange={setOltInput}
                valor={olt}
                inputValue={oltInput}
            />
            <FloatingLabelInput
                obrigatorio
                labelProp={"Nome da CTO"}
                placeholderProp={"Informe o nome da CTO"}
            />
            <FloatingLabelInput
                tipo="number"
                obrigatorio
                labelProp={"Quantidade de portas"}
                placeholderProp={"Informe a quantidade de portas da CTO"}
            />
            <button className="botao" type="submit" >Cadastrar</button>
        </form>
    </FormularioEstiizado>
}

export {
    FormularioCadastro,
    FormularioCadastroCto
}