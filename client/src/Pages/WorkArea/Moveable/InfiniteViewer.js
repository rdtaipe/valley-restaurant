import React from 'react'
import InfiniteViewer from 'react-infinite-viewer';


export default function InfiniteViewerComponent({ children, viewerRef,onScroll,onPinch }) {


    return (
        <InfiniteViewer
            ref={viewerRef} 
            className="viewer"
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

        </InfiniteViewer>
    )
}
