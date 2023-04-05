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
        ]
    }
}
export const reducers = {
    setActions: (state, action) => {
        state.actions = action.payload
    },

    setState: (state, action) => {
        const { keys, value, only } = action.payload
        // ({keys:"toolbar.left.type",value:v,only:true}))
        // console.log(keys,"on")
        //key: "menu.itmes.home"
        if (keys) {
            if (keys.includes(".")) {

                const newKeys = keys.split(".")
                const last = newKeys[newKeys.length - 1]


                const recursive = (state, i) => {
                    const type = Object.prototype.toString.call(state[newKeys[i]]) || null//si es array detener si no seguir
                    const RealData = JSON.parse(JSON.stringify(state[newKeys[i]]))

                    if (type === "[object Array]") {
                        //if object value:{onj}
                        //if array only :true

                        if (i < newKeys.length - 1) {
                            //if object value: {id:1}||{onj}
                            state.map((item, i) => {
                                if (item[newKeys[i]]) {
                                    recursive(item[newKeys[i]], i + 1);
                                }
                            })
                        } else {
                            const newValuekeys = Object.keys(value).map((item) => item)
                            var newState= state[newKeys[i]].map((item, i) => {
                                
                               return newValuekeys.reduce((result, key) => {
                                if (item.id === value.id && item[key] !== value[key]) {
                                    var newItem={...item,[key]: value[key]}
                                    return {...result, ...newItem}
                                }
                                return { ...item,...result}
                              }, {});

                            })
                            state[newKeys[i]] = newState
                        }


                    } else if (type === "[object Object]") {
                        //if object value: string, number , boolean, array, object
                        //if array only :undefinet


                        if (i < newKeys.length - 1) {
                            recursive(state[newKeys[i]], i + 1);
                        } else {
                            state[newKeys[i]] = value;
                        }

                    }


                };
                recursive(state, 0);




                //key=toolbar, i=0, obj=state
                //key=left, i=1, obj=state.toolbar
                //key=active, i=2, array=state.toolbar.left.map((item,i)=>{if(i===2){item.active=value}})

                /*                 newKeys.map((key, i) => {
                                   
                                 
                                    const type=Object.prototype.toString.call(state[key])//si es array detener si no seguir
                                    if(type==="[object Array]"){
                                        console.log(key,"---arr")
                
                                        //obtener el valor real de state no proxy ejemplo: state.toolbar.left
                
                                        //JSON A OBJETO
                                        const obj = JSON.parse(JSON.stringify(state[key]))
                                        console.log(obj);
                                        
                                        console.log(state[key],"---arr")
                                        state[key].map((item,i)=>{
                                            if(i===newKeys.length-1){
                                                item[last]=value
                                            }
                                        })
                                    }else if(type==="[object Object]"){
                                        console.log(key,"---obj")
                                        state = state[key]
                                    }
                
                
                                   /*  const bucle = (obj, name) => {
                                        //tetectar si obj es un array o un objeto
                                        // if(obj[name]){
                
                                        // }
                
                                        if (keys.length === 1) {//si es el ultimo elemento
                                            const type=Object.prototype.toString.call(obj[name])//si es array detener si no seguir
                
                                            if(type==="[object Array]"){
                                                console.log("array","---end")
                                            }else{
                                                console.log("object","---end")
                
                                            }
                                            // obj[name] = value
                                        } else {//si no es el ultimo elemento
                                            // detect Proxy(Array) or Proxy(Object)
                                            const type=Object.prototype.toString.call(obj[name])//si es array detener si no seguir
                
                                            if(type==="[object Array]"){
                                                console.log("array","---next")
                                            }else{
                                                console.log("object","---next")
                                                bucle(obj[name], newKeys[i + 1])//llamar a la funcion con el siguiente elemento
                
                                            }
                                          
                
                                        }
                                    }
                                    bucle(state, key) */


            } else {
                state[keys] = value
            }
        }

        //     const bucle=(obj,keys,value)=>{
        //         if(keys.length===1){
        //             obj[keys[0]]=value
        //         }else{
        //             bucle(obj[keys[0]],keys.slice(1),value)
        //         }


        //     }
        //     bucle(state,keys.split("."),value)
        // }


    }


}

