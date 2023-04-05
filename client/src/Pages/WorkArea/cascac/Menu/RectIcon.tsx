import * as React from "react";
import Icon from "./Icon";
import Memory from "../utils/Memory";
import CropLandscapeOutlinedIcon from '@mui/icons-material/CropLandscapeOutlined';

export default class RectIcon extends Icon {
    public static id = "Rect";
    public static maker = (memory: Memory) => ({
        tag: "div",
        attrs: {},
        style: {
            "background-color": memory.get("background-color"),
        },
    });
    public renderIcon() {
        return (
            <CropLandscapeOutlinedIcon style={{color:"white"}} sx={{fontSize:20}}/>
        );
    }
}
