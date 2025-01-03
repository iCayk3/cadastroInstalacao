import styled from "styled-components"
import Snackbar from '@mui/joy/Snackbar';

const DivEstilizada = styled.div``
const TextoEstilizado = styled.span`
    font-size: 16px;
    font-weight: bold;
    position: relative;
`

export default function AlertAppAutoHide({ texto, color, onclose, animationDuration}) {

    return <DivEstilizada>
        <Snackbar
            open
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            animationDuration={750}
            autoHideDuration={2000}
            color={color}
            onClose={onclose}
        >
                <TextoEstilizado>{texto}</TextoEstilizado>
        </Snackbar>
    </DivEstilizada>
}