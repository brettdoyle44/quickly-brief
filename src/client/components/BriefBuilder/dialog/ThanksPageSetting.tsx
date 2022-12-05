import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  MouseEventHandler,
} from "react";

export default function (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  onCustomRedirect: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{props.children}</DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-50 rounded bg-white shadow-lg border border-gray-50 top-full divide-y divide-gray-100 focus:outline-none min-w-40">
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <button
              className="flex w-full justify-between items-center px-4 py-3 focus:outline-none focus:bg-gray-100"
              onClick={props.onCustomRedirect}
            >
              <span className="text-sm text-gray-900 font-medium">
                Redirect to custom URL
              </span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
