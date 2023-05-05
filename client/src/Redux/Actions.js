import axios from 'axios'
import colors from '../colors'
import { getCookie, saveCookie, getLocal, saveLocal } from './Utils/saveLocal'

// localStorage.getItem('theme')===null?saveLocal('theme','light'):null
export const initialState = {
    actions: {},
    global: {
        page: "",
        order: "def",
        filter: "all",
        data: [],
        model: [],
        itemSelected: {},
        itemModefied: {},

    },
    server: {
        url: "http://localhost:5000/",
        baseUrl: "http://localhost:5000/",
        //routes action
        auth: {
            get: ({ url }) => {
                var token = getCookie("token")
                var headers = { Authorization: `Bearer ${token}` }// for every request
                console.log(token)
                return axios.get(url, {
                    headers: headers,
                })

            },
            post: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.post(url, { ...send, headers: headers })
            },
            put: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.put(url, { ...send, headers: headers })
            },
            delete: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.delete(url, { ...send, headers: headers })
            },

        },
        get: (url) => axios.get(url),
        post: (url, house) => axios.post(url, house),
        put: (url, id, house) => axios.put(url + id, house),
        delete: (url, id) => axios.delete(url + id),
        find: (url, query) => axios.get(url + query),
        clone: (url, id) => {
            const f = async () => {
                let data = await axios.get(url + id)
                data = State.server.dataObjPreFix(data.data)
                return axios.post(url, data)
            }
            return f()
        },

        dataObjPreFix: (data) => {
            var newData = {}
            for (let i in data) {
                // no _id, __v, createdAt, updatedAt
                if (i !== "__v" && i !== "_id" && i !== "createdAt" && i !== "updatedAt" && i !== "id") {
                    newData[i] = data[i]
                }
            }
            return newData
        }
    },
    user: {
        token: () => !getCookie("token") ? null : getCookie("token"),
        autorized: () => !getLocal("autorized") ? false : getLocal("autorized"),
        obj: {},
    },
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
    menu: {
        open: true,
        width: 280,

        setWidth: "",
        items: [
            { type: "item", name: "Dashboard", active: false, sx: { m: "20px 0px" } },
            { type: "title", name: "Store", title: true },
            { type: "item", name: "Houses", active: false },
            { type: "item", name: "Products", active: false },
            { type: "title", name: "Client Facing", title: true },
            { type: "item", name: "Users", active: false },
            { type: "item", name: "Sales", active: false },
            { type: "item", name: "Projects", active: false },
            { type: "title", name: "Management", title: true },
            { type: "item", name: "Employees", active: false },
            { type: "item", name: "Roles", active: false },
            { type: "item", name: "Permissions", active: false },

        ]
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
