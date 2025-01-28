import styled from 'styled-components'

const Botao = ({nome, tipo}) => {

    const DivButtEstilizda = styled.button`
        
            width: 100%;
            padding: 10px;
            background-color: #1E3CE1;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        
    `

    return (
        <DivButtEstilizda type={tipo}>
            {nome}
        </DivButtEstilizda>
    )
}

export default Botao