import { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import {
  Heading1,
  Heading2,
  Type,
  Minus,
  FileUp,
  AlignLeft,
  CircleDot,
  CheckCircle,
} from "lucide-react";
import Generator from "../generator";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Builder() {
  const [item, setItem] = useState<any>([{}]);
  const [formLabel, setLabelValue] = useState("");

  const handleAddStuff = (label: string, htmlItem: string) => {
    setItem((item: any) => [...item, { label, htmlItem }]);
    console.log(item);
  };

  return (
    <div>
      {/* <button onClick={() => handleAddStuff()}>Add Something</button> */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            Options
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                    onClick={() => handleAddStuff("H1 is Here", "h1")}
                  >
                    <Heading1
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Heading 1
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                    onClick={() => handleAddStuff("H2 is Here", "h2")}
                  >
                    <Heading2
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Heading 2
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                    onClick={() => handleAddStuff("Text starts here", "text")}
                  >
                    <Type
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Text
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                    onClick={() => handleAddStuff("Short text input", "input")}
                  >
                    <Minus
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Short Text
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    <AlignLeft
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Long Text
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    <CircleDot
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Select One
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    <CheckCircle
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Select Multiple
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    <FileUp
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    File Upload
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div>
        {item.map((theItem: any, idx: number) => {
          return (
            <Generator
              key={idx}
              htmlItem={theItem.htmlItem}
              label={theItem.label}
            />
          );
        })}
      </div>
    </div>
  );
}
