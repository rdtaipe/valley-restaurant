import * as React from "react";
import { prefix, connectEditorProps } from "../utils/utils";
import { IObject, camelize } from "@daybrush/utils";
import Memory from "../utils/Memory";
import Editor from "../Editor";
import { EditorInterface } from "../types";
import styled from "@emotion/styled";

export interface Maker {
  tag: string;
  attrs: IObject<any>;
  style: IObject<any>;
}

@connectEditorProps
export default abstract class Icon extends React.PureComponent<{
  editor: Editor;
  selected?: boolean;
  onSelect?: (id: string) => any;
}> {
  public static id: string;
  public static maker?: (memory: Memory) => Maker;
  public static makeThen: (target: HTMLElement | SVGElement) => any = () => {};
  public keys: string[] = [];
  public abstract renderIcon(): any;
  private subContainer = React.createRef<HTMLDivElement>();
  public render() {
    return (
      <MenuIcon
        className={(this.props.selected ? "selected" : "")}
        >
        onClick={this.onClick}
        {this.renderIcon()}
        {this.renderSubContainer()}
      </MenuIcon>
    );
  }
  public renderSubContainer() {
    const subIcons = this.renderSubIcons();

    if (!subIcons.length) {
      return;
    }
    return [
      <ExtendsIcon key={"extends-icon"}></ExtendsIcon>,
      this.props.selected && (
        <ExtendsContainer
          key={"extends-container"}
          ref={this.subContainer}
          onClick={this.onSubClick}
        >
          {subIcons}
        </ExtendsContainer>
      ),
    ];
  }
  public renderSubIcons(): any[] {
    return [];
  }
  public renderSubIcon(IconClass: typeof Icon, id: string, isSelect: boolean) {
    return (
      <SubIconLabelBox
        key={id}
        className={(isSelect ? "selected" : "")}
        onClick={() => {
          this.onSubSelect!(id);
        }}
      >
        <IconClass editor={this.props.editor} selected={false} />
        <SubIconLabel >{camelize(` ${id}`)}</SubIconLabel>
      </SubIconLabelBox>
    );
  }
  public onClick = () => {
    if (this.props.selected) {
      this.focusSub();
    }
    const onSelect = this.props.onSelect;

    if (onSelect) {
      onSelect((this.constructor as any).id);
    }
  };
  public onSubClick = (e: any) => {
    e.stopPropagation();
  };
  public focusSub() {
    const subContainer = this.subContainer.current;
    if (!subContainer) {
      return;
    }

    if (subContainer.style.display === "block") {
      subContainer.style.display = "none";
    } else {
      subContainer.style.display = "block";
    }
  }
  public blur = () => {
    const subContainer = this.subContainer.current;
    if (!subContainer) {
      return;
    }

    subContainer.style.display = "none";
  };
  public onSubSelect(id: string) {}
  public componentDidMount() {
    const keys = this.keys;
    if (keys.length) {
      this.keyManager.keydown(
        keys,
        (e) => {
          if (e.ctrlKey || e.metaKey) {
            return false;
          }
          this.onClick();
        },
        (this.constructor as any).id
      );
    }
  }
}

export default interface Icon extends EditorInterface {}

const MenuIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.1s;
  border-radius: 4px;
  margin: 2px;
  &:hover {
    background-color: #555;
  }
  &.selected {
    background-color: #242993;
  }
`;

const ExtendsIcon = styled.div`
  position: absolute;
  right: 2px;
  bottom: 2px;
  border-bottom: 5px solid #eee;
  border-right: 0;
  border-left: 5px solid transparent;
`;
// extends-container
const ExtendsContainer = styled.div`
  position: absolute;
  left: 110%;
  top: -30px;
  background: var(--back2);
  /* width: 200px;
    height: 200px; */
  border-radius: 5px;
  z-index: 1;
  transform: translate(10px) translateZ(2px);
  box-shadow: 1px 1px 2px var(--back1);
  display: none;
`;

//sub-icon-label
const SubIconLabelBox = styled.div`
position: relative;

width: 120px;
display: flex;
align-items: center;
justify-content: center;
white-space: nowrap;
cursor: pointer;
background-color: transparent;
transition: background-color 0.1s;
border-radius: 4px;

 
    margin: 12px 0px;
 &:hover {
    background-color: #555;
  }
  &.selected {
    background-color: #242993;
  }

`
const SubIconLabel = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-left: 5px;
`;
