export const MixStyledRules=(component,style)=>{
    var newComponent=d(component)
    var newStyle=d(style)
    var newNameStyle=""

    var MixStyles={}
    if(!newComponent && newStyle){
        newNameStyle=style.componentStyle.componentId
        MixStyles=newStyle
    }else if(newComponent && !newStyle){
        newNameStyle=component.componentStyle.componentId
        MixStyles=newComponent
    }else if(newComponent&&newStyle){
        newNameStyle=component.componentStyle.componentId

        MixStyles=newComponent+newStyle
    }
  
    return {newStyle:MixStyles,nameStyle:newNameStyle}

}

function d(input){
    if(!input)return null
    const newStyle=input.componentStyle.rules[0]
return  newStyle.replace(/\/\*[\s\S]*?\*\//g, '');
}
function fix(input) {
    // Eliminar comentarios de CSS
    input = input.replace(/\/\*[\s\S]*?\*\//g, '');
  
    // Buscar "&:hover" o "&.classname:hover"
    input = input.replace(/&(?::\s*hover|\.\w+\s*:\s*hover)/g, ':hover');
  
    // Buscar "&.classname"
    input = input.replace(/&(\.\w+)/g, '$1');
  
    // Buscar "{ propiedad: valor }" y agregar ";" al final
    input = input.replace(/({[^{}]+})/g, '$1;');
  
    // Reemplazar "{ }" por " { }"
    input = input.replace(/{\s*}/g, ' { }');
  
    return input;
  }
const CssToObj=(text)=>{
    var obj={}
    text=text.replace(/\/\*.*?\*\//g,"")//elimina los comentarios
    text.split(";").map((style)=>{
        if(style!==""){
            var styleArr=style.split(":")
            obj[styleArr[0].replace(/\s/g,"")]=styleArr[1]
        }
    })
    return obj
}

const ObjToCss=(obj)=>{
    var css=""
    for (const [key, value] of Object.entries(obj)) {
        css+=`${key}:${value};`
      }
      return css
}

const objToCssJs=(css)=>{
    var jsCss={}
    for (const [key, value] of Object.entries(css)) {

    

       
        if(key.includes("-")){
            
           

            var keyArr=key.split("-")
           
           
            var newKey=keyArr[0]
            keyArr.map((key,i)=>{
                if(i!==0){
                    newKey+=key[0].toUpperCase()+key.slice(1)
                }
            })
            jsCss[newKey]=value
        }else{
            jsCss[key]=value
        }

       

        }

    return jsCss
}



function toCSS(styleObj) {
    let cssString = '';
    for (const property in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, property)) {
        cssString += `${property}: ${styleObj[property]};\n`;
      }
    }
    return cssString;
  }

  function cssToObject(css) {
    console.log(css)
    // Elimina los comentarios del CSS
    
    css = css.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    
    // Separa las reglas del CSS y las convierte en un objeto
    const rules = css.split(';')
    .filter(Boolean)
    .map(rule => rule.trim().split(':'))
    .reduce((acc, [property, value]) => {
      acc[property] = value.trim();
      return acc;
    }, {});
    
    return rules;
  }