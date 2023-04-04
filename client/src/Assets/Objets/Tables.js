import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Table1} from './svg/Table1.svg'
import { ReactComponent as Table2} from './svg/Table2.svg'
import { ReactComponent as Table3} from './svg/Table3.svg'
export function Tables({ component,type,style,fill,color,stroke,width,height}) {

    const types = {
        1: <Table1 />,
        2: <Table2/>, 
        3: <Table3/>
    }

    return (
        <Svg component={component} styler={style} fill={fill} color={color} stroke={stroke} width={width} height={height} >
           {types[type]}
        </Svg>

    )
}

const Svg = styled.div`

& svg{
    ${({styler})=> styler || ""};
   width:${({width})=> width || "auto"};
    height:${({height})=> height || "auto"}; 

    & #area{
        fill:${({fill})=> fill || "rgba(0,0,0,.2)"};
    }
    /* todos lo que tengan como atributo data-name="chair" */
    & [data-name="chair"]{
        fill:${({color})=> color || "#fff"};
        stroke:${({stroke})=> stroke || "gray"};
    }
    ${({component})=> component?component.componentStyle.rules[0] : ""};
}

`