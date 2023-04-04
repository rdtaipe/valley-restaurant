import axios from 'axios'
import colors from '../colors'
import {getCookie,saveCookie,getLocal,saveLocal} from './Utils/saveLocal'

// localStorage.getItem('theme')===null?saveLocal('theme','light'):null

export const initialState = {
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
    navbar:{
        divice:0,//0=desktop,1=tablet,2=mobile
        height:[60,50,40],
        


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
export const reducers ={

    setState:(state,action)=>{
        //key: "menu.itmes.home"
        const {keys,value}=action.payload
        //recusive function
        console.log(keys)
        const bucle=(obj,keys,value)=>{
            if(keys.length===1){
                obj[keys[0]]=value
            }else{
                bucle(obj[keys[0]],keys.slice(1),value)
            }

           
        }
        bucle(state,keys.split("."),value)
    }



    

}

