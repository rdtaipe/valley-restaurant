import reactDom from 'react-dom/client'
// reduxtulkit
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'
import SetterProvider from './Redux/Store'

const initialState = {
    animation: {
        open: ".4,0,0,1"
    },
    navbar: {
        divice: 0,//0=desktop,1=tablet,2=mobile
        height: [60, 50, 40],
    },

    workspace: {
        open: true,
        top: 50,
        left: 40,
        right: 40,
        bottom: 60,
        guides: {
            x: [],
            y: [],
        },
        selected: {},
        selecteds: [],
        data: [
            {
                type: "canvas",
                name: "Lienzo 1",
                id: "ed20u8xcey87qg6jxgez2c",
                order: 0,
                entity: true,
                zoom: 100,
                show: true,
                select: false,
                children: [

                    // group
                    {
                        type: "group",
                        select: false,
                        id: "A",
                        name: "group 0",
                        children: [],

                        contains: {
                            squares: [{ id: "utncvxpktth3641sesjdar" }],
                            circles: [{ id: "utncvxpktth3641sesjdar" }],
                        }
                    },

                    // square
                    {
                        type: "square",
                        select: false,
                        id: "utncvxpktth3641sesjdar",
                        name: "square 0",
                        order: 0,
                        entity: true,
                        group: {
                            appertain: "A",
                        },

                        editable: {
                            name: true,
                            draggable: true,//top left
                            resizable: true,//width height
                            rotatable: true,//rotate
                            roundable: true,//borderRadius
                            pinchable: true,//pinch

                        },
                        style: {
                            top: 100,
                            left: 100,
                            height: 100,
                            width: 100,
                            backgroundColor: "#FFF",
                            borderWidth: 1,// borderWidth;
                            borderStyle: "solid",// borderstyle;
                            borderColor: "gray",// borderColor;
                            // borderRadius:0,//borderRadius
                            borderTopLeftRadius: 0,//borderRadius top left
                            borderTopRightRadius: 0,//borderRadius top right
                            borderBottomLeftRadius: 0,//borderRadius bottom left
                            borderBottomRightRadius: 0,//borderRadius bottom right
                            opacity: 1,//opacity
                            transform: "rotate(0deg)",
                            zIndex: 0,
                        }
                    },

                    // circle
                    {
                        type: "circle",
                        select: false,
                        id: "xry4fpoe",
                        name: "circle 0",
                        order: 0,
                        entity: true,
                        group: {
                            appertain: "A",
                        },
                        editable: {
                            name: true,
                            draggable: true,//top left
                            resizable: true,//width height
                            rotatable: true,//rotate
                            roundable: false,//borderRadius
                            pinchable: true,//pinch

                        },
                        style: {
                            top: 50,
                            left: 50,
                            height: 100,
                            width: 100,
                            backgroundColor: "#FFF",
                            border: "1px solid #707070",
                            borderRadius: "50%",
                            transform: "rotate(0deg)",
                            zIndex: 0,

                        }
                    },

                    // text
                    {
                        type: "text",
                        select: false,
                        id: "fegegergv",
                        name: "text 0",
                        order: 0,
                        entity: true,
                        value: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had",
                        group: {
                            appertain: "A",
                        },
                        editable: {
                            name: true,
                            draggable: true,
                            resizable: true,
                            rotatable: true,
                            roundable: false,
                            pinchable: true,
                        },
                        style: {
                            top: 100,
                            left: 200,
                            height: 200,
                            width: 200,
                            // 
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            borderWidth: 1,// borderWidth;
                            borderStyle: "dashed",// borderstyle;
                            borderColor: "gray",// borderColor;
                            //text 
                            fontSize: 14,
                            fontWeight: "normal",
                            fontFamily: "Arial",
                            color: "gray",
                            textAlign: "left", //left center right  justify
                            textJustify: "inter-word", //auto inter-word inter-character
                            overflow: "hidden", //hidden visible scroll auto
                            // textAlign:"center",

                            transform: "rotate(0deg)",
                            zIndex: 0,
                        }

                    }

                ],

                editable: {
                    name: true,
                    draggable: false,
                    resizable: true,
                    rotatable: false,
                    roundable: false,
                    pinchable: true,
                },
                style: {
                    width: 500,
                    height: 500,
                    backgroundColor: "gray",
                    zIndex: 0
                }
            }
        ]


    },
    toolbar: {
        leftBar: null,
        rightBar: null,
        left: [
            { id: 1, type: "select", active: false, icon: "arrow_selector_tool", tooltip: "Seleccionar", shortcut: "esc" },
            { id: 2, type: "square", active: false, icon: "crop_7_5", tooltip: "Rectangulo", shortcut: "r" },
            { id: 3, type: "circle", active: false, icon: "circle", tooltip: "Circulo", shortcut: "c" },
            { id: 4, type: "polygon", active: false, icon: "pentagon", tooltip: "Poligono", shortcut: "y" },
            { id: 5, type: "pen", active: false, icon: "polyline", tooltip: "Pluma", shortcut: "p" },
            { id: 6, type: "text", active: false, icon: "title", tooltip: "Texto", shortcut: "t" },
            { id: 7, type: "addObject", active: false, icon: "note_add", tooltip: "Agregar imagen", shortcut: "ctrl+a" },
        ],
        right: [
            { id: 1, type: "properties", active: false, icon: "tune", tooltip: "Propiedades", shortcut: "ctrl+p" },
            { id: 2, type: "layers", active: false, icon: "layers", tooltip: "Capas", shortcut: "ctrl+y" },
        ],
        test: [
            {
                id: 1, obj: {
                    type: "properties", arr: [{ id: "sad", name: "hola" }, { id: "awqr", name: "hola" }]
                }
            },
            {
                id: 2, obj: {
                    type: "layers", arr: [{ id: "23w", name: "hola" }, { id: "as2wqr", name: "hola" }]
                }
            },

        ]
    }

}
const actions={
    setData:(state,payload)=>{
        console.log(state,payload)
    }
}

const root = reactDom.createRoot(document.querySelector('#root'))
root.render(
    <SetterProvider state={initialState} actions={actions}>

        <RouterProvider router={Routes} />

    </SetterProvider>

)