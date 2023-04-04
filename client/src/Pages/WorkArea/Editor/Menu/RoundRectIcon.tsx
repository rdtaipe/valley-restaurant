import * as React from "react";
import Icon from "./Icon";
import Memory from "../utils/Memory";
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';

export default class RoundRectIcon extends Icon {
    public static id = "RoundRect";
    public static maker = (memory: Memory) => ({
        tag: "div",
        attrs: {},
        style: {
            "background-color": memory.get("background-color"),
            "border-radius": "10px",
        },
    });
    public renderIcon() {
        return (
            <CropFreeOutlinedIcon style={{color:"white"}} sx={{fontSize:18}}/>
        );
    }
}
