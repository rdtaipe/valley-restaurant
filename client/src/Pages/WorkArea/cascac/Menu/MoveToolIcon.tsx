import * as React from "react";
import Icon from "./Icon";
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

export default class MoveToolIcon extends Icon {
    public static id = "MoveTool";
    public keys = ["v"];
    public renderIcon() {
        return (
            <NearMeOutlinedIcon style={{color:"white"}}  sx={{fontSize:16}}/>
        );
    }
}
