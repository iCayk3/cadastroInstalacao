import styled from "styled-components"


const RodapeEstilizado = styled.footer`
    margin-top: 94px;
    display: flex;
    color: #fff;
    justify-content: space-around;
    height: 5rem;
    width: 100%;
    background-image: linear-gradient(180deg, #1E3CE1   , #484FF4);
    align-items: center;
    position: static;
    bottom: 0;
    .sol {
        font-size: 30px;
    }
    .rodape-div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .dev {
        font-size: 12px;
    }
`

const Rodape = () => {
    return <RodapeEstilizado>
        <div className="rodape-div">
            <span>App de controle de serviço </span>
            <span className="sol">SOL PROVEDOR DE INTERNET </span>
            <span className="dev">Desenvolvido por Cayke Silva. </span> 
        </div>       
    </RodapeEstilizado>
}

export default Rodape