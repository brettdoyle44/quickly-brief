import ArrowIcon from "../tooling/SvgIcon/ArrowIcon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { copyToClip } from "../utils";
import FormBlock from "./FormBlock";
import { useState, useEffect } from "react";

const unHelpText = ["h1", "h1", "rich_text", "hidden"];
const unRequire = ["h1", "h2", "rich_text"];

const fileTypeList = [
  { value: "jpg", name: "JPG" },
  { value: "png", name: "PNG" },
  { value: "gif", name: "GIF" },
  { value: "pdf", name: "PDF" },
  { value: "csv", name: "CVS" },
  { value: "word", name: "WORD" },
  { value: "excel", name: "EXCEL" },
];

export default function (props: any) {
  const [help, setHelp] = useState(false);

  const { formItem = {}, index, length, showInput = true } = props;

  useEffect(() => {
    if (formItem.type === "file_upload") {
      props.onInputChange(
        formItem.file_type.length > 0
          ? formItem.file_type
          : [fileTypeList[0].value],
        "file_type"
      );
    }
  }, [formItem.type]);

  const onCloseAutoFocus = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (help) {
      setHelp(false);
      props.onHelpTextFocus();
    }
  };
  // 选择文件类型
  const onFileType = (type: string) => {
    const typeList = [...formItem.file_type];
    const index = typeList.indexOf(type);
    if (index === -1) {
      typeList.push(type);
    } else {
      typeList.length > 1 && typeList.splice(index, 1);
    }
    props.onInputChange(typeList, "file_type");
  };

  return (
    <DropdownMenu.Root onOpenChange={props.onOpenChange}>
      <DropdownMenu.Trigger asChild>{props.children}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={15}
        onCloseAutoFocus={onCloseAutoFocus}
        className="z-50 rounded bg-white shadow-lg border border-gray-50 top-full divide-y divide-gray-100 focus:outline-none min-w-60"
      >
        <DropdownMenu.Group>
          {!unRequire.includes(formItem.type) && (
            <DropdownMenu.CheckboxItem
              checked={formItem.required}
              tabIndex={-1}
              onClick={() => {
                props.onInputChange(!formItem.required, "required");
              }}
              className="flex w-full justify-between items-center px-4 py-3 cursor-pointer focus:outline-none focus:bg-gray-100"
            >
              <span className="text-sm text-gray-900 font-medium">
                Required
              </span>
              <input
                className="h-4 w-4 text-gray-900 border-gray-300 rounded pointer-events-none cursor-pointer"
                type="checkbox"
                disabled
                checked={formItem.required}
              ></input>
            </DropdownMenu.CheckboxItem>
          )}
        </DropdownMenu.Group>
        {formItem.type === "number" && (
          <DropdownMenu.Group>
            <form className="px-4 py-3 space-y-3">
              <div className="relative">
                <div className="mb-2">
                  <label
                    htmlFor="min"
                    className="leading-snug text-sm text-gray-900 font-medium tracking-normal"
                  >
                    Min. value
                  </label>
                </div>
                <div>
                  <input
                    id="min"
                    name="min"
                    type="number"
                    onChange={(e) => {
                      props.onInputChange(
                        e.target.value ? Number(e.target.value) : "",
                        "min"
                      );
                    }}
                    value={formItem.min}
                    className="theme-border theme-ring block w-full px-3 py-0 pr-8 h-8 md:pr-4 border rounded text-gray-900 transition-colors duration-100 ease-out appearance-none focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="mb-2">
                  <label
                    htmlFor="max"
                    className="leading-snug text-sm text-gray-900 font-medium tracking-normal"
                  >
                    Max. value
                  </label>
                </div>
                <div>
                  <input
                    id="max"
                    name="max"
                    type="number"
                    value={formItem.max}
                    onChange={(e) => {
                      props.onInputChange(
                        e.target.value ? Number(e.target.value) : "",
                        "max"
                      );
                    }}
                    className="theme-border theme-ring block w-full px-3 py-0 pr-8 h-8 md:pr-4 border rounded text-gray-900 transition-colors duration-100 ease-out appearance-none focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                  />
                </div>
              </div>
            </form>
          </DropdownMenu.Group>
        )}
        {formItem.type === "file_upload" && (
          <DropdownMenu.Group>
            <form className="px-4 py-3 space-y-3">
              <div className="relative">
                <div className="mb-2 leading-snug text-sm text-gray-900 font-medium tracking-normal">
                  Type
                </div>
                {fileTypeList.map((item) => (
                  <DropdownMenu.CheckboxItem
                    checked={formItem.file_type.includes(item.value)}
                    key={item.value}
                    onClick={() => {
                      onFileType(item.value);
                    }}
                    className="flex w-full justify-between items-center py-2 pl-2 cursor-pointer focus:outline-none"
                  >
                    <span className="leading-snug text-sm text-gray-900 font-medium tracking-normal">
                      {item.name}
                    </span>
                    <input
                      className="h-4 w-4 text-gray-900 border-gray-300 rounded pointer-events-none cursor-pointer"
                      type="checkbox"
                      disabled
                      checked={formItem.file_type.includes(item.value)}
                    ></input>
                  </DropdownMenu.CheckboxItem>
                ))}
              </div>
              <div className="relative">
                <div className="mb-2">
                  <label
                    htmlFor="max_size"
                    className="leading-snug text-sm text-gray-900 font-medium tracking-normal"
                  >
                    Max size (MB)
                  </label>
                </div>
                <div>
                  <input
                    id="max_size"
                    name="max_size"
                    type="number"
                    value={formItem.max_size}
                    onChange={(e) => {
                      props.onInputChange(
                        e.target.value ? Number(e.target.value) : "",
                        "max_size"
                      );
                    }}
                    className="theme-border theme-ring block w-full px-3 py-0 pr-8 h-8 md:pr-4 border rounded text-gray-900 transition-colors duration-100 ease-out appearance-none focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                  />
                </div>
              </div>
            </form>
          </DropdownMenu.Group>
        )}
        {!unHelpText.includes(formItem.type) && !formItem.help && (
          <DropdownMenu.Item asChild>
            <button
              onClick={() => {
                setHelp(true);
              }}
              tabIndex={-1}
              className="flex w-full justify-between items-center px-4 py-3 cursor-pointer focus:outline-none focus:bg-gray-100"
            >
              <span className="text-sm text-gray-900 font-medium">
                Add help text
              </span>
            </button>
          </DropdownMenu.Item>
        )}
        <FormBlock
          nested
          type="update"
          itemType={formItem.type}
          showInput={showInput}
          onUpdateFormItem={(name: any) => {
            props.onUpdateOrAddItem(name, "update");
          }}
        >
          <div
            tabIndex={-1}
            className="flex w-full justify-between items-center cursor-pointer px-4 py-3 focus:outline-none focus:bg-gray-100"
          >
            <span className="text-sm text-gray-900 font-medium cursor-default">
              Turn into
            </span>
            <ArrowIcon classList="w-4 h-4 text-gray-900" />
          </div>
        </FormBlock>
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <button
              className={`flex w-full justify-between items-center 
              px-4 py-3 focus:outline-none focus:bg-gray-100 
              ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={index === 0}
              onClick={() => {
                props.onItemMove(-1);
              }}
            >
              <span className="text-sm text-gray-900 font-medium">Move up</span>
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button
              className={`flex w-full justify-between 
              items-center px-4 py-3 focus:outline-none focus:bg-gray-100 
              ${index + 1 === length ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={index + 1 === length}
              onClick={() => {
                props.onItemMove(1);
              }}
            >
              <span className="text-sm text-gray-900 font-medium">
                Move down
              </span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <button
              className="flex w-full justify-between items-center px-4 py-3 focus:outline-none focus:bg-gray-100"
              onClick={props.onDeleteItem}
            >
              <span className="text-sm text-gray-900 font-medium">Delete</span>
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button
              className="flex w-full justify-between items-center px-4 py-3 focus:outline-none focus:bg-gray-100"
              onClick={() => {
                props.onUpdateOrAddItem(formItem.type, "copy");
              }}
            >
              <span className="text-sm text-gray-900 font-medium">
                Duplicate
              </span>
            </button>
          </DropdownMenu.Item>
          <FormBlock
            nested
            type="add_above"
            showInput={showInput}
            itemType={formItem.type}
            onAddItemAbove={(name: any) => {
              props.onUpdateOrAddItem(name, "add_above");
            }}
          >
            <div className="flex w-full justify-between items-center cursor-pointer px-4 py-3 focus:outline-none focus:bg-gray-100">
              <span className="text-sm text-gray-900 font-medium cursor-default">
                Add block above
              </span>
              <ArrowIcon classList="w-4 h-4 text-gray-900" />
            </div>
          </FormBlock>
          <FormBlock
            nested
            type="add_below"
            itemType={formItem.type}
            showInput={showInput}
            onAddItemBelow={(name: any) => {
              props.onUpdateOrAddItem(name, "add_below");
            }}
          >
            <div className="flex w-full justify-between items-center cursor-pointer px-4 py-3 focus:outline-none focus:bg-gray-100">
              <span className="text-sm text-gray-900 font-medium cursor-default">
                Add block below
              </span>
              <ArrowIcon classList="w-4 h-4 text-gray-900" />
            </div>
          </FormBlock>
        </DropdownMenu.Group>
        {!unRequire.includes(formItem.type) && (
          <DropdownMenu.Group>
            <DropdownMenu.Item asChild>
              <button
                className="flex w-full justify-between items-center px-4 py-3 focus:outline-none focus:bg-gray-100"
                onClick={() => copyToClip(formItem.id)}
              >
                <span className="text-sm text-gray-900 font-medium">
                  Copy ID
                </span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
