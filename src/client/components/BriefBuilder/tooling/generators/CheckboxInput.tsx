import DeleteIcon from "../SvgIcon/DeleteIcon";
import {
  Key,
  KeyboardEvent,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";
import BaseInput from "./BaseInput";

export default function (props: {
  onItemOption?: any;
  onInputChange?: any;
  onItemOptionValue?: any;
  item?: any;
}) {
  const { item = {} } = props;

  const onAddItem = (idx: any, e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.onItemOption(idx, "add");
    }
  };

  return (
    <BaseInput item={item} onInputChange={props.onInputChange}>
      <div className="space-y-4">
        {item.options.map(
          (
            option: {
              id: Key | null | undefined;
              value:
                | boolean
                | ReactChild
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            },
            idx: number
          ) => {
            return (
              <div
                key={option.id}
                className="relative bg-white flex justify-between items-center rounded border px-4 py-3 focus:outline-none border-gray-200"
              >
                <span
                  className="font-medium text-gray-600 flex-1 cursor-text focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={(e) => {
                    onAddItem(idx, e);
                  }}
                  onBlur={(e) => {
                    props.onItemOptionValue(idx, e);
                  }}
                  data-placeholder="Type here to add another option"
                >
                  {option.value}
                </span>
                <div className="w-4 h-4 rounded border border-gray-200" />
                {item.options.length > 1 && idx < item.options.length - 1 && (
                  <button
                    tabIndex={-1}
                    onClick={() => {
                      props.onItemOption(idx, "delete");
                    }}
                    className="hidden group-hover:flex justify-center items-center bg-gray-300 w-6 h-6 rounded-full absolute right-0 mr-3 focus:outline-none focus:ring-2"
                  >
                    <DeleteIcon classList="text-gray-900" />
                  </button>
                )}
              </div>
            );
          }
        )}
      </div>
    </BaseInput>
  );
}
