import axios from 'axios'
import colors from '../colors'

export const State = {
    actions:{},
    global:{
        page:"",
        order:"def",
        filter: "all",
        data:[],
        model:[],
        itemSelected:{},
        itemModefied:{},
        
    },
    server:{
        url:"http://localhost:5000/",
        baseUrl:"http://localhost:5000/",
        //routes action   
        auth:{
            get:({url})=>{
                var token=getCookie("token")
                    var headers={Authorization:`Bearer ${token}`}// for every request
             console.log(token)
                    return axios.get(url,{
                        headers:headers,
                      })
                  
            },
            post:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.post(url,{...send,headers:headers})
            },
            put:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.put(url,{...send,headers:headers})
            },
            delete:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.delete(url,{...send,headers:headers})
            },

        },
        get:(url)=>axios.get(url),
        post:(url,house)=>axios.post(url,house),
        put:(url,id,house)=>axios.put(url+id,house),
        delete:(url,id)=>axios.delete(url+id),
        find:(url,query)=>axios.get(url+query),
        clone:(url,id)=>{
            const f=async()=>{
                let data=await axios.get(url+id)
                data=State.server.dataObjPreFix(data.data)
                return axios.post(url,data)
            }
            return f()
        },

        dataObjPreFix:(data)=>{
            var newData={}
            for(let i in data){
                // no _id, __v, createdAt, updatedAt
                if(i!=="__v" && i!=="_id" && i!=="createdAt" && i!=="updatedAt" && i!=="id"){
                    newData[i]=data[i]
                }
            }
            return newData
        }
    },
    user:{
        token:()=> !getCookie("token")?null:getCookie("token"),
        autorized:()=>!getLocal("autorized")?false:getLocal("autorized"),
        obj:{},
    },
    theme: {
        mode:()=> {return getLocal('theme')},
        setMode:"",
        colors:{...colors},
        use:()=>{
            return State.theme.colors[State.theme.mode()]
        }
    },
    animation:{
        open:".4,0,0,1"
    },
    menu:{
        open:true,
        width:280,
        setWidth:"",
        items:[
            {type:"item",name:"Dashboard",active:false,sx:{m:"20px 0px"}},
            {type:"title",name:"Store",title:true},
            {type:"item",name:"Houses",active:false},
            {type:"item",name:"Products",active:false},
            {type:"title",name:"Client Facing",title:true},
            {type:"item",name:"Users",active:false},
            {type:"item",name:"Sales",active:false},
            {type:"item",name:"Projects",active:false},
            {type:"title",name:"Management",title:true},
            {type:"item",name:"Employees",active:false},
            {type:"item",name:"Roles",active:false},
            {type:"item",name:"Permissions",active:false},

        ]
    },
}
export const Actions ={
    addActions: (state, action) => {
        state.actions={...state.actions,...action.payload}
    },
    toggleMenu: (state, action) => {
        state.menu.open=!state.menu.open
        state.menu.width=state.menu.open?280:60
    },
    setActiveMenuItem: (state, action) => {
     
            state.menu.items.map(item=>{
                if(item.name.toLowerCase()===action.payload.toLowerCase()){
                    item.active=true
                }else{
                    item.active=false
                }
            })
        
      
    },
    changeTheme:(state,action)=>{
        const theme=getLocal("theme")
         saveLocal("theme",theme === "dark" ? "light" : "dark")
        state.theme.setMode=theme === "dark" ? "light" : "dark"
    }, 
    setUrlBase:(state,action)=>{
        state.server.url=action.payload
    },
    setGlobalData:(state,action)=>{
        state.global.data=action.payload
    },
    setModel:(state,action)=>{
        state.global.model=action.payload
    },
    setItemSelected:(state,action)=>{
        state.global.itemSelected=action.payload
    },
    setUser:(state,action)=>{
        const {key,value}=action.payload
        if(key==="autorized"){
            saveLocal("autorized",value)
        }else if(key==="token"){
            saveCookie("token",value)
        }else{
            state.user[key]=value

        }
    }



    

}

// save local storage
const saveLocal = (key,v) => {
    try {
        const data = JSON.stringify(v)
        localStorage.setItem(key, data)
    } catch (e) {
        console.log(e)
    }
}
const getLocal = (key) => {
    try {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    } catch (e) {
        console.log(e)
    }
}
localStorage.getItem('theme')===null?saveLocal('theme','light'):null


//save cookien for 24 hours
const saveCookie = (key,v) => {
    try {
        const data = JSON.stringify(v)
        document.cookie = `${key}=${data};max-age=86400`
    } catch (e) {
        console.log(e)
    }
}
const getCookie = (key) => {
    try {
        const data = document.cookie.split(';').find(c => c.trim().startsWith(`${key}=`))
        return JSON.parse(data.split('=')[1])
    } catch (e) {
        console.log(e)
    }
}
