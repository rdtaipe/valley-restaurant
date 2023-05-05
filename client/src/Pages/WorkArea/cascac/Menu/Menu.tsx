import * as React from "react";
import MoveToolIcon from "./MoveToolIcon";
import TextIcon from "./TextIcon";
import CropIcon from "./CropIcon";
import RectIcon from "./RectIcon";
import OvalIcon from "./OvalIcon";
import RoundRectIcon from "./RoundRectIcon";
import Icon from "./Icon";
import Editor from "../Editor";
import KeyboardIcon from "./KeyboardIcon";
import styled from "styled-components";

const MENUS: Array<typeof Icon> = [
  MoveToolIcon,
  TextIcon,
  CropIcon,
  RectIcon,
  RoundRectIcon,
  OvalIcon,
];
export default class Menu extends React.PureComponent<{
  editor: Editor;
  onSelect: (id: string) => any;
}> {
  public state = {
    selected: "MoveTool",
  };
  public menuRefs: Array<React.RefObject<Icon>> = [];
  public render() {
    return (
      <Container>
        {this.renderMenus()}
        <KeyboardBox>
          <KeyboardIcon editor={this.props.editor} />
        </KeyboardBox>
      </Container>
    );
  }
  public renderMenus() {
    const selected = this.state.selected;
    const menuRefs = this.menuRefs;
    const editor = this.props.editor;

    return MENUS.map((MenuClass, i) => {
      const id = MenuClass.id;
      if (!menuRefs[i]) {
        menuRefs[i] = React.createRef();
      }
      return (
        <MenuClass
          ref={menuRefs[i]}
          key={id}
          editor={editor}
          selected={selected === id}
          onSelect={this.select}
        />
      );
    });
  }
  public select = (id: string) => {
    this.setter({
      selected: id,
    });
    this.props.onSelect(id);
  };
  public getSelected(): typeof Icon | undefined {
    const selected = this.state.selected;
    return MENUS.filter((m) => m.id === selected)[0];
  }
  public blur() {
    this.menuRefs.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.blur();
    });
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 100vh;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  box-sizing: border-box;
`;
const KeyboardBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  border-top: 1px solid #555;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  &.selected {
    background-color: #242993;
  }
`;
