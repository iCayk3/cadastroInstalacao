import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '../../Services/useFetch';


export default function FieldAutoComplet({ uri, label, aoAlterado }) {

    const { data, loading, error } = useFetch(uri)

    return (
        <>
            {error && <p>Erro na solitação</p>}
            {loading && <p>Carregando</p>}
            {data &&
                <Autocomplete
                    onChange={aoAlterado}
                    disablePortal
                    options={data}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />}
        </>
    );
}   