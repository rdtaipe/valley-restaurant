import React from 'react'
import InfiniteViewer from 'react-infinite-viewer';
import styled from 'styled-components';


export default function View({ children, viewerRef,onScroll,onPinch }) {


    return (
        <Container
            ref={viewerRef} 
            useAutoZoom={true}
            useWheelScroll={true}
            onScroll={onScroll}
            onPinch={onPinch}
            // horizontal={true}
            // vertical={true}
            // zoom={1}
            // zoomSpeed={0.1}
            // margin={0}
            // threshold={0}
            // rangeX={[0, 0]}
            // rangeY={[0, 0]}
            // useWheelScroll={true}
        >

            {children}

        </Container>
    )
}

const Container = styled(InfiniteViewer)`

position: absolute;
  top: 30px;
  left: 30px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);

`
