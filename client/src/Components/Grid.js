import React from 'react'
import styled from 'styled-components'

export function Grid({style,children, childHeight,childWidth}) {
    

    return (
        <Container style={style} childHeight={childHeight} childWidth={childWidth}>
            {
            children
            }
            
        </Container>
    )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(${props => props.childWidth? props.childWidth+"px": '200px'}, 1fr));
grid-gap: 1rem;
grid-template-rows: auto;
justify-content: center;
align-items: flex-start;

& .card{
    height: ${props => props.childHeight? props.childHeight+"px": '260px'};
}
`