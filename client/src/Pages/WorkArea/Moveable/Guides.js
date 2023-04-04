import React,{useState,useRef} from 'react'
import styled from 'styled-components';
import Guides from '@scena/react-guides';

export default function GuidesComponent({type,guidesRef,zoom,unit}) {
    // ref =ref
    // type = horizontal,vertical
    // zoom = 1
    // unit = 50
    if(!type||!guidesRef||!zoom||!unit){ return null }

    return (
         <Container type={type} n={30}>
                <Guides
              
                backgroundColor="#DDDDDD"
                textColor="gray"
                lineColor="gray"
                ref={guidesRef}
                type={type}
                useResizeObserver={true}
                displayDragPos={false}
                displayGuidePos={false}
                snapThreshold={5}
                zoom={zoom}
                unit={unit}
                />
            </Container>
    )
}

const Container = styled.div`
    position: absolute;
    height: ${({ type , n }) => (type === "horizontal" ? n+"px" : `calc(100% - ${n}px)`)};
    width: ${({ type , n}) => (type === "horizontal" ? `calc(100% - ${n}px)` :  n+"px" )};
    left: ${({ type , n}) => (type === "horizontal" ? n+"px": "0")};
    top: ${({ type , n}) => (type === "horizontal" ? "0" : n+"px")};
  
    & .scena-guides-guide{
        background-color:  aqua!important;
    }

`