import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Selecto from 'react-selecto';
import styled from 'styled-components';

export default function Selector({ selectorRef,setSelected,setSelecteds}) {


    return (
        <Selecto
            ref={selectorRef}
            hitRate={0}
            ratio={0}
            selectByClick={true}
            selectFromInside={true}
            scroll={true}
            scrollContainerRect={true}
            scrollThreshold={100}
            dragContainer={'.moveable-container'}
            boundContainer={'.moveable-container'}
            selectableTargets={[".moveable"]}
        
            
         onKeydown={e => {
                if (e.key === "Escape") {
                    selectorRef.current.clearSelection();
                }
            }}
            onSelectStart={e => {
                const target = e.selected[0];
                if (target) {
                    setSelected(target);
                }
            }}

            // onSelect={e => {
            //     setSelecteds(e.selected[0]);
            //     setSelected(e.selected);
            // }}
            
             onSelect={e => {
                const target = e.selected[0];
                console.log("onSelect",target)
                if (target) {
                    setSelected(target);
                }
            }} 
 
       />
    )
}
