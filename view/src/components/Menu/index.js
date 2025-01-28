import styled from "styled-components"
import MenuLink from "../MenuLink"

const HeaderMenuEstilizado = styled.header`
    
        padding-left: 1rem;
        height: 6rem;
        display: grid;
        grid-template-columns: 8% 80%;
        justify-content: space-around   ;
        background-image: linear-gradient(0deg, #1E3CE1   , #4146F5);
        align-items: center;
    

    img {
        width: 8rem;
    }

    .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    @media only screen and (max-width: 1438px) {
            
        }
        @media only screen and (max-width: 998px) {
            
        }
        @media only screen and (max-width: 768px) {
            
        }
        @media only screen and (max-width: 600px) {
            display: grid;
            justify-content: space-between;
            grid-template-columns: 50% 50%;
        }

`

export default function Menu() {

    return (
        <HeaderMenuEstilizado>
            <img src="logo.png" alt="logo" />
            <nav className="menu">
                <MenuLink to="/">
                    Inicio
                </MenuLink>
                <MenuLink to="/overview">
                    Overview
                </MenuLink>
                <MenuLink to="/cadastro">
                    Cadastros
                </MenuLink>
            </nav>
        </HeaderMenuEstilizado>
    )
}