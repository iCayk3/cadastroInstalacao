import styled from 'styled-components'
import './Header.css'

const HeaderEstilizada = styled.div`
        display: flex   ;
        height: 75px;
        background-color: cornflowerblue;
        width: 100%;
`

const Header = () => {
    return (
        <HeaderEstilizada> Header</HeaderEstilizada>
    )
}

export default Header