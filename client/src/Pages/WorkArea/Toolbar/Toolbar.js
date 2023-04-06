import React from 'react'
import styled from 'styled-components'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Icon from '../Components/Icon';

export default function Toolbar({ align, items,width,height, selected, style, sx, itemStyle }) {


    const fixStyle = (align)=>{
        var obj = {}
        if(align === "left"){//vertical
            obj.left = 0
            obj.top = 0
            obj.flexDirection = "column"
            obj.justifyContent = "flex-start"
            obj.alignItems = "center"
            obj.width = width||100
            obj.height = height||"100%"
        }else if(align === "right"){//vertical
            obj.right = 0
            obj.top = 0
            obj.flexDirection = "column"
            obj.justifyContent = "flex-start"
            obj.alignItems = "center"
            obj.width = width||100
            obj.height = height||"100%"
        }else if(align === "top"){//horizontal
            obj.top = 0
            obj.left = 0
            obj.flexDirection = "row"
            obj.justifyContent = "center"
            obj.alignItems = "flex-start"
            obj.width = height||"100%"
            obj.height = width||100

        }else if(align === "bottom"){//horizontal
            obj.bottom = 0
            obj.left = 0
            obj.flexDirection = "row"
            obj.justifyContent = "center"
            obj.alignItems = "flex-start"
            obj.width = height||"100%"
            obj.height = width||100
        }
        return obj

    }
    var newStyle = {...fixStyle(align),...style}
    return (
        <Container
            style={newStyle}
            sx={sx}

        >

            {items.map((item, i) => (
                <Li key={i} disablePadding style={itemStyle} className={item.active?"active":" "}>
                    <LiButton onClick={(e) => selected(e, item)}>
                            <Icon className={item.icon} />
                    </LiButton>
                </Li>
            ))}
        </Container>
    )
}

const Container = styled(Paper)`
position: fixed!important;
display: flex!important;
zIndex: 99!important;

`
const Li = styled(ListItem)`
position: relative;
margin: 2px!important;
width: 35px!important;
height: 35px!important;
overflow: hidden;
border-radius: 4px!important;
display: flex;
justify-content: center;
align-items: center;
&.active{
    background: #3389ff;
    & i{
        color: #fff;
    }
}

`
const LiButton = styled(ListItemButton)`
position: relative!important;
width: 100%;
height: 100%;
display: flex!important;
justify-content: center!important;
align-items: center!important;
`
