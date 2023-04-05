import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

// import{ ReactComponent as  Logo } from '../assets/canvasLogo.svg'

import Logo from '../Assets/canvasLogo.svg'

export default function Navbar() {
  const space = useSelector(state => state.workspace)


  return (
    <Header style={{ height: space.top }}>
      <LogoBox>
        <CanvasLogo src={Logo} alt="logo" />
        <AllText>
          (alfa)
        </AllText>
      </LogoBox>

    </Header>
  )
}
const Header = styled.header`
position: fixed;
top: 0px;
left: 0px;
width:100%!important;
background-color: #FFF;
display: flex;
flex-direction: row;
align-items: center;
z-index: 9999;
overflow: hidden;
padding-left: 8px;
box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); 
`
const LogoBox = styled.header`
position: relative;
display: flex;
align-items: center!important;


& img{
    height: 32px!important;
    padding-right: 4px;
}

`

const CanvasLogo = styled.img`

`
const Bar = styled.header`

`
const allStyle = styled.style`

`
const AllText = styled.text`
height: 18px;
`