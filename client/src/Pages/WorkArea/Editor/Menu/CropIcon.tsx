import * as React from "react";
import Icon from "./Icon";
import { splitBracket } from "@daybrush/utils";
import OvalIcon from "./OvalIcon";
import RectIcon from "./RectIcon";
import CircleIcon from "./CircleIcon";
import PolygonIcon from "./PolygonIcon";
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
export default class CropIcon extends Icon {
    public static id = "Crop";
    public keys = ["c"];
    public renderIcon() {
        return (
            <CropOutlinedIcon style={{color:"white"}} sx={{fontSize:16}}/>
        );
    }
    public renderSubIcons() {
        const frame = this.moveableData.getSelectedFrames()[0];
        let cropType = this.memory.get("crop") || "inset";

        if (frame) {
            const clipPath = frame.get("clip-path") || frame.get("clip");

            if (clipPath) {
                cropType = splitBracket(clipPath).prefix!;
            }
        }
        return [
            this.renderSubIcon(RectIcon, "inset", cropType === "inset"),
            this.renderSubIcon(RectIcon, "rect", cropType === "rect"),
            this.renderSubIcon(CircleIcon, "circle", cropType === "circle"),
            this.renderSubIcon(OvalIcon, "ellipse", cropType === "ellipse"),
            this.renderSubIcon(PolygonIcon, "polygon", cropType === "polygon"),
        ];
    }
    public onSubSelect(id: string) {
        const moveableData = this.moveableData;
        const frame = moveableData.getSelectedFrames()[0];

        if (frame) {
            const clipPath = frame.get("clip-path") || frame.get("clip");

            if (clipPath) {
                const cropType = splitBracket(clipPath).prefix!;

                if (id !== cropType) {
                    const infos = moveableData.removeProperties("clip-path", "clip");

                    this.historyManager.addAction("renders", { infos });
                }
            }
        }

        this.memory.set("crop", id);
        this.eventBus.requestTrigger("update");

        this.forceUpdate();
    }
}
