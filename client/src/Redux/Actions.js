import axios from 'axios'
import colors from '../colors'
import { getCookie, saveCookie, getLocal, saveLocal } from './Utils/saveLocal'

// localStorage.getItem('theme')===null?saveLocal('theme','light'):null
export const initialState = {
    actions: {},
    theme: {
        mode: () => { return getLocal('theme') },
        setMode: "",
        colors: { ...colors },
        use: () => {
            return State.theme.colors[State.theme.mode()]
        }
    },
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
        data:[]

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
export const reducers = {
    setActions: (state, action) => {
        state.actions = action.payload
    },

    setter: (state, action) => {
        const { keys, value, only } = action.payload;

        const recursive = (obj, keys, value) => {
            if (!obj || !keys) return obj;

            const [currentKey, ...remainingKeys] = keys.split(".");
            const type = Object.prototype.toString.call(obj[currentKey]);

            if (type === "[object Array]") {
                const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0]);
                if (index !== -1) {
                    if (remainingKeys.length === 1) {
                        const [newKeys, newValue] = [Object.keys(value)[0], Object.values(value)[0]];
                        obj = {
                            ...obj,
                            [currentKey]: only ? obj[currentKey].map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        [newKeys]: newValue
                                    };
                                }
                                return {
                                    ...item,
                                    [newKeys]: false
                                };
                            }) : [
                                ...obj[currentKey].slice(0, index),
                                {
                                    ...obj[currentKey][index],
                                    ...value
                                },
                                ...obj[currentKey].slice(index + 1)
                            ]
                        };
                    } else {
                        obj = {
                            ...obj,
                            [currentKey]: [
                                ...obj[currentKey].slice(0, index),
                                recursive(obj[currentKey][index], remainingKeys.slice(1).join("."), value),
                                ...obj[currentKey].slice(index + 1)
                            ]
                        };
                    }
                }
            } else if (type === "[object Object]") {
                if (remainingKeys.length === 1) {
                    obj = {
                        ...obj,
                        [currentKey]: {
                            ...obj[currentKey],
                            [remainingKeys[0]]: value
                        }
                    };
                } else {
                    obj = {
                        ...obj,
                        [currentKey]: remainingKeys.length ? recursive(obj[currentKey], remainingKeys.join("."), value) : value
                    };
                }
            }

            return obj;
        };

        if (keys.includes(".")) {
            const newState = recursive({ ...state }, keys, value);
            return {
                ...state,
                ...newState,
            };
        } else {
            return {
                ...state,
                [keys]: value
            };
        }
    }

}

const parse = (v) => JSON.parse(JSON.stringify(v))
