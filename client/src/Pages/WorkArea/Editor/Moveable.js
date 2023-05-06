import React, { useState, useEffect, useRef } from 'react'
import Moveable from "react-moveable";
import { useSelector, useDispatch } from 'react-redux';
import cssobj from "cssobj";
import cssjson from "cssjson";
import jsoncss from "jsoncss";
import { css } from "motion-css";

const test = {
    top: 100,
    left: 100,
    height: 100,
    width: 100,
    backgroundColor: "#FFF",
    borderWidth: 1,// borderWidth;
    borderStyle: "solid",// borderstyle;
    borderColor: "#707070",// borderColor;
    // borderRadius:0,//borderRadius
    borderTopLeftRadius: 0,//borderRadius top left
    borderTopRightRadius: 0,//borderRadius top right
    borderBottomLeftRadius: 0,//borderRadius bottom left
    borderBottomRightRadius: 0,//borderRadius bottom right
    opacity: 1,//opacity
    transform: "rotate(0deg)",
    zIndex: 0,
}


const getCssRules = (target) => {
    if (!target) return { tocss: '', tojs: {} }
    const cssJson = cssjson.toJSON(target.style.cssText).attributes || {}
    var toCss = (json) => {

        if (json || typeof json === 'object') {

            var string = 'undefined'
            string = jsoncss.convert(json) || 'undefined'
            //si contine en las primeras 10 letras undefeinet lo elimina

            if (string.slice(0, 9).includes('undefined')) {
                string = string.slice(9)
            }
            return string

        }
    }
    return {
        tojs: cssJson || {},
        tocss: toCss(cssJson) || '',
    }
}


export default function MoveableComponent({ moveableRef, selected, selecteds, zoom, onChange }) {
    const space = useSelector(state => state.workspace)
    const [cssRules, setCssRules] = useState([]);
    const [value, setValue] = useState({})
    const xInputRef = useRef(null);
    const yInputRef = useRef(null);
    const [requestCallbacks] = useState(() => {
        function request() {
            moveableRef.current.request("draggable", {
                x: parseInt(xInputRef.current.value),
                y: parseInt(yInputRef.current.value),
            }, true);
        }
        return {
            onInput(e) {
                const ev = (e.nativeEvent || e)

                if (typeof ev.data === "undefined") {
                    request();
                }
            },
            onKeyUp(e) {
                e.stopPropagation();

                // enter
                if (e.keyCode === 13) {
                    request();
                }
            },
        };
    });



    useEffect(() => {
        // const { css, js } = 
        // const cssRules = Array.from(document.styleSheets)
        //     .filter(({ href }) => href && href.includes("moveable"))
        //     .map(({ cssRules }) => cssRules)
        //     .flat();

        // console.log(getCssRules(selected))
    }, [selected, zoom, space.guides]);


    // console.log(space.guides)

    const changeValues = (e) => {


        onChange("hola")
    }

    const onDrag = ({ target, clientX, clientY, top, left, isPinch, beforeTranslate }) => {
        target.style.left = `${left}px`;
        target.style.top = `${top}px`;

    }


    return (<>
        <div>
            X: <input ref={xInputRef} type="number" defaultValue="100" {...requestCallbacks}></input>&nbsp;
            Y: <input ref={yInputRef} type="number" defaultValue="150" {...requestCallbacks}></input>
        </div>
        <Moveable
            // dimensionViewable={true}
            ref={moveableRef}
            target={selected}
            zoom={zoom}
            //refresh the moveable when the zoom changesA


            draggable={true}
            resizable={true}
            roundable={true}
            rotatable={true}
            scalable={true}
            pinchable={true}
            keepRatio={false}
            useResizeObserver={true}
            useMutationObserver={true}
            origin={true}
            edge={true}
            throttleDrag={0}
            throttleResize={0}
            throttleRotate={0}
            throttleScale={0}
            renderDirections={["nw", "n", "ne", "e", "se", "s", "sw", "w", "nw", "n"]}

            //line guides hel0er
            snappable={true}
            // snapDirections={{"top":true,"left":true,"bottom":true,"right":true}}
            // clippable={true}

            snapThreshold={5}
            verticalGuidelines={space.guides.y}
            horizontalGuidelines={space.guides.x}
            snapCenter={true}
            snapElement={true}
            snapHorizontal={true}
            snapVertical={true}
            snapDirections={{ "top": true, "left": true, "bottom": true, "right": true, "center": true, "middle": true }}
            elementSnapDirections={{ "top": true, "left": true, "bottom": true, "right": true, "center": true, "middle": true }}
            maxSnapElementGuidelineDistance={null}
            elementGuidelines={['.moveable']}

            onDrag={onDrag}
            onDragEnd={(e) => {
                requestAnimationFrame(() => {
                    const rect = e.moveable.getRect();
                    xInputRef.current.value = rect.left;
                    yInputRef.current.value = rect.top;

                });
            }}
            /*   onResizeStart={({ setOrigin, dragStart }) => {
                  setOrigin(["%", "%"]);
                  dragStart && dragStart.set(selecteds.map((target) => {
                      return [target.offsetLeft, target.offsetTop];
                  }));
              }} */
            onResize={({ target, width, height, drag }) => {
                target.style.width = `${width}px`;
                target.style.height = `${height}px`;

            }}
            /* onRotateStart={({ set }) => {
                set(selecteds.map((target) => {
                    return target.getAttribute("data-rotate") || 0;
                }));
            }} */
            onRotate={({ target, beforeRotate }) => {
                target.style.transform = `rotate(${beforeRotate}deg)`;
                target.setAttribute("data-rotate", beforeRotate);
            }}
            /*  onScaleStart={({ setOrigin, dragStart }) => {
                 setOrigin(["%", "%"]);
                 dragStart && dragStart.set(selecteds.map((target) => {
                     return [target.offsetLeft, target.offsetTop];
                 }));
             }} */
            onScale={({ target, drag, scale }) => {
                target.style.transform = `scale(${scale[0]}, ${scale[1]})`;

            }}
            /* onPinchStart={({ setOrigin, dragStart }) => {
                setOrigin(["%", "%"]);
                dragStart && dragStart.set(selecteds.map((target) => {
                    return [target.offsetLeft, target.offsetTop];
                }));
            }} */
            onPinch={({ target, drag, scale }) => {
                target.style.transform = `scale(${scale[0]}, ${scale[1]})`;

            }}
        /*  onRender={({ target, left, top, width, height, transform, transformOrigin, rotate }) => {
             target.style.left = `${left}px`;
             target.style.top = `${top}px`;
             target.style.width = `${width}px`;
             target.style.height = `${height}px`;
             target.style.transform = transform;
             target.style.transformOrigin = transformOrigin;
             target.style.transform = `rotate(${rotate}deg)`;
         }}
         onRenderGroup={({ targets, left, top, width, height, transform, transformOrigin, rotate }) => {
             targets.forEach((target) => {
                 target.style.left = `${left}px`;
                 target.style.top = `${top}px`;
                 target.style.width = `${width}px`;
                 target.style.height = `${height}px`;
                 target.style.transform = transform;
                 target.style.transformOrigin = transformOrigin;
                 target.style.transform = `rotate(${rotate}deg)`;
             });
         }}

*/



        />
    </>

    )
}
