import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import Guides from '@scena/react-guides';

export default function Guide({ type, guidesRef, zoom, unit }) {
    // ref =ref
    // type = horizontal,vertical
    // zoom = 1
    // unit = 50
    if (!type || !guidesRef || !zoom || !unit) { return null }

    return (
        <Container type={type} n={14} className={type}>
            <Guides

                backgroundColor="#DDDDDD"
                textColor="transparent"
                lineColor="gray"
                ref={guidesRef}
                type={type}
                useResizeObserver={true}
                displayDragPos={false}
                displayGuidePos={false}
                snapThreshold={5}
                // zoom={zoom}
                // unit={unit}
            />
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
   
    /* overflow: hidden; */
    height: ${({ type, n }) => (type === "horizontal" ? n + "px" : `calc(100% - ${0}px)`)};
    width: ${({ type, n }) => (type === "horizontal" ? `calc(100% - ${0}px)` : n + "px")};
    left: ${({ type, n }) => (type === "horizontal" ? 0+ "px" : -n + "px")};
    top: ${({ type, n }) => (type === "horizontal" ? -n+"px" : 0 + "px")};
    
   /* background: red; */
    /* border-radios:50%; */
    & .scena-guides-guide{
        background-color:  aqua!important;
    }
    & canvas{
        border-radius:${({ type, n }) => (type === "horizontal" ?`${n/2}px ${n/2}px 0 0!important`: `${n/2}px 0 0 ${n/2}px!important`)};
        opacity: .3!important;
    } 
/* 
pointer-events: all!important;
&:hover + .vertical{
    & canvas{
        opacity: .7!important;

    }
}

&:hover + .horizontal{
    & canvas{
        opacity: .7!important;

    }
} */


`
