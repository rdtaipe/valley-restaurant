import React from 'react'
import InfiniteViewer from 'react-infinite-viewer';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


export default function Editor({ children, setZoom, viewerRef, onScroll, onPinch, horizontalGuidesRef, verticalGuidesRef }) {

    const space = useSelector(state => state.workspace)


    return (
        <Container
            ref={viewerRef}
            useAutoZoom={true}
            useWheelScroll={true}
            space={space}
        // horizontal={true}
        // vertical={true}
        // zoom={1}
        // zoomSpeed={0.1}
        // margin={0}
        // threshold={0}
        // rangeX={[0, 0]}
        // rangeY={[0, 0]}
        // useWheelScroll={true}
        /*  onScroll={(e) => {
             horizontalGuidesRef.current.scroll(e.scrollLeft);
             horizontalGuidesRef.current.scrollGuides(e.scrollTop);

             verticalGuidesRef.current.scroll(e.scrollTop);
             verticalGuidesRef.current.scrollGuides(e.scrollLeft);
             if(onScroll){
                 onScroll(e)

             }
         }}*/
         onPinch={(e) => {
             const zoom = e.zoom;
            //  horizontalGuidesRef.current.zoomTo(zoom);
            //  verticalGuidesRef.current.zoomTo(zoom);
            //  if(onPinch){
            //      onPinch(e)
            //  }
             setZoom(e.zoom);

         }} 
        >

            {children}

        </Container>
    )
}

const Container = styled(InfiniteViewer)`
position: absolute;
left:${({ space }) => space.left}px;
width: calc(100% - ${({ space }) => space.left}px );
height: calc(100%);

`
