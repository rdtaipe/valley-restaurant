import * as React from "react";
import Icon from "./Icon";
import Memory from "../utils/Memory";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'; 

export default class OvalIcon extends Icon {
    public static id = "Oval";
    public static maker = (memory: Memory) => ({
        tag: "div",
        attrs: {},
        style: {
            "background-color": memory.get("background-color"),
            "border-radius": "50%",
        },
    });
    public renderIcon() {
        return (
          
            <CircleOutlinedIcon style={{color:"white"}} sx={{fontSize:18}}/>
        );
    }
}
