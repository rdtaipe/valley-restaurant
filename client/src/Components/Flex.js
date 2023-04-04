import React,{useRef,useEffect,useState} from 'react';
import styled from 'styled-components';

import { MixStyledRules } from "./Utils/MixStyledRules"
import { Container } from '@mui/material';


export const Flex=({style,children})=>{

    return (
        <FlexContainer style={style}>
            {
                children
            }
            
        </FlexContainer>
    )

}
const FlexContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
`

export const FlexLeft = ({style,children}) => {

    return (
        <FlexLeftContainer style={style}>
            {
                children
            }
            
        </FlexLeftContainer>
    )
}
const FlexLeftContainer = styled.div`
position: relative;
width: 100%;
height: auto;
display: flex;
left: 0;
justify-content: flex-start;
`
export const FlexCenter = ({style,children,sx}) => {

    return (
        <Container component={FlexCenterContainer} sx={sx} style={style}>
            {
                children
            }
            
        </Container>
    )
}
const FlexCenterContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`
export const FlexRight = ({style,children}) => {
    
        return (
            <FlexRightContainer style={style}>
                {
                    children
                }
                
            </FlexRightContainer>
        )
    }
const FlexRightContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
right: 0;
display: flex;
justify-content: flex-end;
`

export const FlexTop = ({style,children}) => {
        
            return (
                <FlexTopContainer style={style}>
                    {
                        children
                    }
                    
                </FlexTopContainer>
            )
        }
const FlexTopContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
align-items: flex-start;
`
export const FlexMiddle = ({style,children}) => {
                
                    return (
                        <FlexMiddleContainer style={style}>
                            {
                                children
                            }
                            
                        </FlexMiddleContainer>
                    )
                }   
const FlexMiddleContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
align-items: center;
`
export const FlexBottom = ({style,children}) => {
                        
                            return (
                                <FlexBottomContainer style={style}>
                                    {
                                        children
                                    }
                                    
                                </FlexBottomContainer>
                            )
                        }
const FlexBottomContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
align-items: flex-end;
`

export const FlexCenterCenter = ({component,style,children,onClick,className}) => {

    return (
        <FlexCenterCenterContainer component={component}  style={style} >
            {
                children
            }
            
        </FlexCenterCenterContainer>
    )
}
const FlexCenterCenterContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex!important;
justify-content: center;
align-items: center;
${({component})=>{
    if(component){
        return component.componentStyle.rules[0]
    }else{
        return ""
    }
}}
`
export const FlexCenterTop = ({component,style,children,onClick,className}) => {
    
        return (
            <FlexCenterTopContainer style={style}>
                {
                    children
                }
                
            </FlexCenterTopContainer>
        )
    }
const FlexCenterTopContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: flex-start;
${({component})=>{
    if(component){
        return component.componentStyle.rules[0]
    }else{
        return ""
    }
}}
`
export const FlexCenterBottom= ({component,style,children,onClick,className}) => {
            
                return (
                    <FlexCenterBottomContainer style={style}>
                        {
                            children
                        }
                        
                    </FlexCenterBottomContainer>
                )
            }
const FlexCenterBottomContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: flex-end;
${({component})=>{
    if(component){
        return component.componentStyle.rules[0]
    }else{
        return ""
    }
}}
`
export const FlexCenterLeft = ({component,style,children,onClick,className}) => {


        return (
            <FlexCenterLeftContainer component={component} style={style} onClick={onClick} className={className}>
                {
                    children
                }

            </FlexCenterLeftContainer>
        )            

}   
const FlexCenterLeftContainer =  styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: nowrap;
box-sizing: border-box;
${({component})=>{
    if(component){
        return component.componentStyle.rules[0]
    }else{
        return ""
    }
}}


`

export const FlexCenterRight = ({component,style,children,onClick,className}) => {
                            
    return (
        <FlexCenterRightContainer style={style}>
            {
                children
            }
            
        </FlexCenterRightContainer>
    )
}
const FlexCenterRightContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: flex-end;
align-items: center;
${({component})=>{
    if(component){
        return component.componentStyle.rules[0]
    }else{
        return ""
    }
}}
`


