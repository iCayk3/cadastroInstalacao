import useFetch from "../../Services/useFetch";
import './selectApp.css'


const SelectApp = ({ label, uri, onSelectChange, valor, nome }) => {

    const { data, loading, error } = useFetch(uri);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onSelectChange(selectedValue, e.target.name);
    };

    return (
        <div className="select-app">
            <label>{label}</label>

            {loading && <p>Carregando...</p>}
            {error && <p></p>}
            {data && (
                <select
                    name={nome}
                    value={valor}
                    onChange={handleChange}
                >
                    <option value=""></option>

                    {data.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.codigo ? `${item.label}: ${item.codigo}` : item.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default SelectApp