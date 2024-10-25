import './Botao.css'

const Botao = (props) => {
    return (
        <div className='botao'>
            <button>{props.nome}</button>
        </div>
        
    )
}

export default Botao