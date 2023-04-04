import React, { useRef, useEffect } from 'react';
import InfiniteViewer from './InfiniteViewer';

import Selecto from 'react-selecto';
import Moveable from 'react-moveable';
import styled from 'styled-components';

import Guides from './Guides';

export default function MoveableComponent(props) {
    const viewerRef = React.useRef(null);
    const [zoom, setZoom] = React.useState(1);
    const unit = Math.round(Math.floor(1 / zoom) * 50) || 50;
    const [selected, setSelected] = React.useState(null);
    const [selecteds, setSelecteds] = React.useState([]);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const selectoRef = useRef(null);
    const moveableRef = useRef(null);
    const horizontalGuidesRef = useRef(null);
    const verticalGuidesRef = useRef(null);


    useEffect(() => {
        viewerRef.current.scrollCenter();
    }, []);

    return (
        <Container style={{ backgroundColor: "#eee" }}>
            <Guides guidesRef={horizontalGuidesRef} type={"horizontal"} zoom={zoom} unit={unit} />
            <Guides guidesRef={verticalGuidesRef} type={"vertical"} zoom={zoom} unit={unit} />

            <InfiniteViewer
                viewerRef={viewerRef}
                onScroll={(e) => {
                    horizontalGuidesRef.current.scroll(e.scrollLeft);
                    horizontalGuidesRef.current.scrollGuides(e.scrollTop);

                    verticalGuidesRef.current.scroll(e.scrollTop);
                    verticalGuidesRef.current.scrollGuides(e.scrollLeft);
                }}
                onPinch={(e) => {
                    const zoom = e.zoom;
                    horizontalGuidesRef.current.zoomTo(zoom);
                    verticalGuidesRef.current.zoomTo(zoom);
                    setZoom(e.zoom);
                }}
            >
            <div  className='moveable-container viewer' style={{ backgroundColor: "#fff", height: 600, width: 600 }}>
                    <Selecto
                        ref={selectoRef}
                        dragContainer={'.moveable-container'}
                        selectableTargets={[".moveable"]}
                        hitRate={0}
                        selectByClick={true}
                        selectFromInside={true}
                        ratio={0}
                        scrollContainer={'.viewer'}
                        scrollOptions={{ threshold: 100 }}
                        scroll={true}
                        onKeydown={e => {
                            if (e.key === "Escape") {
                                selectoRef.current.clearSelection();
                            }
                        }}
                        onSelectStart={e => {
                            const target = e.selected[0];
                            if (target) {
                                setSelected(target);
                            }
                        }}

                        
                        onSelect={e => {
                            const target = e.selected[0];
                            console.log(target)
                            if (target) {
                                setSelected(target);
                            }
                        }}
                    />
                  
                        <Moveable
                            ref={moveableRef}
                            target={selected}
                            draggable={true}
                            throttleDrag={0}
                            throttleResize={0}
                            throttleRotate={0}
                            origin={false}
                            keepRatio={false}
                            edge={false}
                            pinchable={true}

                            onDragStart={({ set }) => {
                                set([position.x, position.y]);
                                
                            }}
                            onDrag={({ target, beforeTranslate }) => {
                                target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                                setPosition({ x: beforeTranslate[0], y: beforeTranslate[1] });
                            }}
                            onDragEnd={({ target, isDrag }) => {
                                if (!isDrag) {
                                    target.style.transform = '';
                                }
                                
                            }}


                        />

                        <Rect className="moveable" ></Rect>
                        <Circle className="moveable" ></Circle>
                    
                </div>

            </InfiniteViewer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    
`
const Rect = styled.div`
    position: absolute;
    background: red;
    width: 100px;
    height: 100px;


`
const Circle = styled.div`
    position: absolute;
    background: blue;
    width: 100px;
    height: 100px;
    border-radius: 50%;
`