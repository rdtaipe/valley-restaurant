import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import Selecto from 'react-selecto';
import styled from 'styled-components';

import Guide from './Guide';
import View from './View';
import Selector from './Selector';
import Moveable from './Moveable';




export default function Canvas({ style }) {
    const viewerRef = React.useRef(null);
    const [zoom, setZoom] = React.useState(1);
    const unit = Math.round(Math.floor(1 / zoom) * 50) || 50;
    const [selected, setSelected] = React.useState(null);
    const [selecteds, setSelecteds] = React.useState([]);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const selectorRef = useRef(null);
    const moveableRef = useRef(null);
    const horizontalGuidesRef = useRef(null);
    const verticalGuidesRef = useRef(null);




    useEffect(() => {
        viewerRef.current.scrollCenter();
    }, [selected]);

    return (
        <Container style={{ backgroundColor: "#eee", ...style }} >
            <Selector selectorRef={selectorRef} setSelected={setSelected} setSelecteds={setSelecteds} />
            <Moveable
                moveableRef={moveableRef}
                selected={selected}
                zoom={zoom}
            />

            <View viewerRef={viewerRef} setZoom={setZoom}>

                <div style={{ backgroundColor: "#fff", height: 600, width: 600 }} className='moveable-container'>

                    <Guide guidesRef={horizontalGuidesRef} type={"horizontal"} zoom={zoom} unit={unit} />
                    <Guide guidesRef={verticalGuidesRef} type={"vertical"} zoom={zoom} unit={unit} />


                    <Rect className="moveable" ></Rect>
                    <Circle className="moveable" ></Circle>

                </div>

            </View>
        </Container>
    );
}

const Container = styled.div`
    position: relative;

    width: 100vw;
    height: 100vh;
    /* overflow: hidden; */
    
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
    transform
`