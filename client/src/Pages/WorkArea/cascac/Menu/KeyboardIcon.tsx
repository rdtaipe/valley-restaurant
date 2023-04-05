import * as React from "react";
import * as ReactDOM from "react-dom";
import Icon from "./Icon";
import { prefix } from "../utils/utils";
import Popup from "../Popup/Popup";
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';

export default class KeyboardIcon extends Icon {
    public static id = "Shortcuts";
    public keys = ["s"];
    public state = {
        renderPopup: false,
    }
    public renderIcon() {
        return (
            <>
                    <KeyboardOutlinedIcon style={{color:"white"}}  sx={{fontSize:24}}/>
                {this.state.renderPopup && this.renderPopup()}
            </>
        );
    }
    public renderPopup() {
        return ReactDOM.createPortal(<Popup editor={this.editor} onClose={this.onClose}>
            <h2>Shortcuts</h2>
            <ul className={prefix("key-list")}>
                {this.keyManager.keylist.map(([keys, description]) => {
                    return <li key={keys.join("+")}>
                        <p className={prefix("key-description")}>{description} <strong>{keys.map(key => <span key={key}>{key}</span>)}</strong></p>
                    </li>
                })}
            </ul>
        </Popup>, this.editor.editorElement.current!);
    }
    public onClick = () => {
        this.setState({
            renderPopup: true,
        })
    }
    public onClose = () => {
        this.setState({
            renderPopup: false,
        })
    }
}
