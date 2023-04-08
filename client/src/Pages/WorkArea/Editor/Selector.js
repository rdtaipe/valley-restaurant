import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Selecto from 'react-selecto';
import styled from 'styled-components';

export default function Selector({ selectorRef,setSelected,setSelecteds}) {


    return (
        <Selecto
            ref={selectorRef}
            ratio={0}
            scroll={true}
            scrollContainerRect={true}
            scrollThreshold={100}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            preventDefault={true}
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
