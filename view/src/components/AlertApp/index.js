import * as React from 'react';
import { Stack, Alert, Button } from '@mui/material';

export default function AlertApp({ severity, texto, fechar}) {

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={severity} variant="filled" action={
                <Button color="inherit" size="small" onClick={fechar}>
                    X
                </Button>
            }>{texto}</Alert>
        </Stack>
    );
}