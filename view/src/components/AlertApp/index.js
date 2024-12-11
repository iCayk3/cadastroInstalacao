import * as React from 'react';
import { Stack, Alert, Button } from '@mui/material';

export default function AlertApp({ severity, texto, onclose}) {

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={severity} variant="filled" action={
                <Button color="inherit" size="small" onClick={onclose}>
                    X
                </Button>
            }>{texto}</Alert>
        </Stack>
    );
}