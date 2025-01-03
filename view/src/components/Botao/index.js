import styled from 'styled-components'
import './Botao.css'

const Botao = (props) => {

    const DivButtEstilizda = styled.div`
        .button {
            width: 50%;
            font-size: 20px;
            border-radius: 5px;
            background-color: blue;
        }
    `

    return (
        <DivButtEstilizda>
            <button>{props.nome}</button>
        </DivButtEstilizda>
    )
}

export default Botao