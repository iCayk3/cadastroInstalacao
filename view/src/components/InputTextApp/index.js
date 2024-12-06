import './inputTextApp.css'

const InputTextApp = ({label, onSelectChange, valor, obrigatorio}) => {

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onSelectChange(selectedValue);
    };

    return (
        <div className='input-text-app'>
            <label>{label}</label>
            <input onChange={handleChange} type='text' placeholder={label} value={valor} required={obrigatorio}/>            
        </div>
    )
}

export default InputTextApp