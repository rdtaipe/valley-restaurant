import React from 'react'
import styled from 'styled-components'
import {FlexCenterLeft,FlexCenterCenter,FlexCenterRight} from './Flex'


export default function Navbar({left,center,right}) {


    return (
        <Container >

            <FlexCenterLeft component={LeftContainer}>
                {left}
            </FlexCenterLeft>
            <FlexCenterCenter>
                {center}
            </FlexCenterCenter>
            <FlexCenterRight>
                {right}
            </FlexCenterRight>

        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0px 2%;
`
const LeftContainer = styled.div`


    `