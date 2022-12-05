import DraggerIcon from "../SvgIcon/DragIcon";
import SettingIcon from "../SvgIcon/SettingIcon";
import { useState, useRef } from "react";
import ItemSetting from "../../dialog/ItemSetting";
import { Draggable } from "react-beautiful-dnd";

export default function Base(props: {
  onInputChange?: any;
  onAddFormItem?: any;
  onDeleteItem?: any;
  onItemMove?: any;
  children?: any;
  index?: any;
  formItem?: any;
  length?: any;
  showInput?: any;
  dragging?: any;
  draggableId?: any;
}) {
  const { index, formItem = {}, length, showInput = true, dragging } = props;

  const [settingOpen, setSettingOpen] = useState(false);

  const rootRef = useRef<any>();

  const onHelpTextFocus = () => {
    const helpText = rootRef?.current?.querySelector(".help-text");
    if (helpText) {
      helpText.focus();
    }
  };

  const onOpenChange = (e: boolean | ((prevState: boolean) => boolean)) => {
    setSettingOpen(e);
  };

  return (
    <Draggable draggableId={`item-${formItem.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`relative group isolate ${formItem.type} ${
            snapshot.isDragging ? "dragging" : ""
          } ${settingOpen ? "settings-open" : ""}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="relative" ref={rootRef}>
            <div
              className={`bg-box absolute rounded-md group-dragging:bg-gray-100 -top-4 -right-4 -bottom-4
                  -left-20 -z-1 ${
                    dragging ? "" : "group-hover:bg-gray-100"
                  } group-focus-within:bg-gray-100
                  group-settings-open:bg-gray-100`}
            ></div>
            <nav
              className={`hidden absolute space-x-1 -ml-6 sm:-ml-15 left-0 top-1/2 transform -translate-y-1/2 flex-col
                  sm:flex-row
                  group-dragging:flex group-focus-within:flex ${
                    dragging ? "" : "group-hover:flex"
                  }
                  group-settings-open:flex`}
            >
              <button
                {...provided.dragHandleProps}
                className="flex justify-center w-6 h-6 rounded foucs:ring-2 focus:outline-none"
              >
                <DraggerIcon classList="block h-6 text-gray-400" />
              </button>
              {/* setting */}
              <ItemSetting
                formItem={formItem}
                length={length}
                index={index}
                showInput={showInput}
                onInputChange={(value: any, prop: any) => {
                  props.onInputChange(value, prop);
                }}
                onUpdateOrAddItem={(name: any, oType: any) => {
                  props.onAddFormItem(name, oType, index);
                }}
                onDeleteItem={() => props.onDeleteItem(index)}
                onHelpTextFocus={onHelpTextFocus}
                onItemMove={(step: any) => {
                  props.onItemMove(index, step);
                }}
                onOpenChange={onOpenChange}
              >
                <button className="flex justify-center w-6 h-6 rounded focus:ring-2 focus:outline-none">
                  <SettingIcon classList="block h-6 text-gray-400" />
                </button>
              </ItemSetting>
            </nav>
            {props.children}
          </div>
        </div>
      )}
    </Draggable>
  );
}
