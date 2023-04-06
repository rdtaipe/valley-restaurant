import styled from "styled-components";
import React from 'react'

export default function Icon({ className, onClick, style }) {


    return (
        <Container onClick={onClick}>
            <i style={style}className="material-symbols-outlined">
                {className}
            </i>
        </Container>
    )
}

export const colors = {
    light: '#fff',
    primaryLightHover: '#B8DEF8',
    primaryLightHoverText: '#6C6C6C',
    primary: '#EFEFEF',
    info: '#0b76f5',
    primaryHover: '#327dff',
    primaryHoverLight: '#499EFF99',
    primaryActive: '#499EFF',
    secondary: '#ff4081',

    defaultSquare: '#FFF',
    defaultSquareHover: '#499EFF',
    defaultSquareBorder: '#707070',
    defaultSquareBorderHover: '#499EFF',

    defaultCanvas: '#eee',
    addAddWorkspaces: '#eee',

    //Left toolbar
    LeftToolbarBackground: '#fff',

    LeftButtonToolbarIconNormal: '#a0a0a0',
    LeftButtonToolbarBackgroundNormal: 'transparent',
    LeftButtonToolbarBackgroundHover: '#7fbfff',
    LeftButtonToolbarBackgroundActive: '#3389ff',

}


const Container = styled.button`

    border-style:none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;

    & i{
        font-size:20px;
        color:${colors.LeftButtonToolbarIconNormal};
        pointer-events: none;
    }

    &.active{
        & i{
        color:${colors.light};
        }
    }

`



