import { FocusEvent, useEffect, useState } from "react";
import AddIcon from "../tooling/SvgIcon/AddIcon";
import SeetingIcon from "../tooling/SvgIcon/SettingIcon";
import FormSetting from "../tooling/FormSetting";
import FormBlock from "../dialog/FormBlock";
import FormItem from "../tooling/generators";
import FormItemBase from "../tooling/generators/Base";
import PageSetting from "../dialog/PageSetting";
import ThanksPageSetting from "../dialog/ThanksPageSetting";
import getUUID from "../utils/uuid";
import { getDefaultItemParams } from "../utils";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import "./Builder.css";
import axios from "axios";

function getDefaultPage() {
  return {
    id: getUUID(),
    button: "Submit",
    blocks: [
      {
        id: getUUID(),
        type: "h1",
        content: "",
        options: [],
      },
    ],
  };
}

function getDefaultThanksPage() {
  return {
    blocks: [
      { id: getUUID(), content: "All done. Thank you!", type: "h1" },
      {
        id: getUUID(),
        content: "Thank you for taking the time to complete the form!",
        type: "rich_text",
      },
      {
        id: getUUID(),
        content: "Your submission has been recorded successfully.",
        type: "rich_text",
      },
    ],
    redirect: false,
  };
}

function getDefaultBuildJson() {
  return window?.editform?.meta_data
    ? JSON.stringify(window?.editform?.meta_data)
    : "";
}

export default function CoreBuilder() {
  const [form, setForm] = useState({
    id: getUUID(),
    name: "Untitled form",
    slug: "untitled-form",
    redirect: "",
    branding: {
      primary_color: "#212129",
      button: "#FFFFFF",
      logo: "",
      logoSize: "small",
    },
  });

  useEffect(function () {
    build();
  }, []);

  const [pageList, setPageList] = useState([getDefaultPage()] as any);

  const [thanksPage, setThanksPage] = useState(getDefaultThanksPage());

  const [dragging, setDragging] = useState(false);

  const [buildJson, setBuildJson] = useState(getDefaultBuildJson());

  const [settingShow, setSettingShow] = useState(false);

  const onUpdateOrAddItem = (
    name: string,
    type: string,
    idx: number,
    pIdx: number,
    isThanks = false
  ) => {
    const params = { ...getDefaultItemParams(name) };
    if (name === "radio" || name === "checkbox") {
      (params as any).options.push({
        id: getUUID(),
        value: "",
      });
    }
    const pItem = isThanks ? thanksPage : pageList[pIdx];
    if (type === "update") {
      const formItem = pItem.blocks[idx];
      if (formItem.type !== name) {
        for (const key in formItem) {
          if (
            Object.hasOwnProperty.call(formItem, key) &&
            Object.hasOwnProperty.call(params, key) &&
            key !== "type"
          ) {
            (params as any)[key] = formItem[key as keyof typeof formItem];
          }
        }
        (params as any).id = formItem.id;
        (pItem as any).blocks[idx] = params;
      }
    } else {
      (params as any).id = getUUID();
      switch (type) {
        case "add_above":
          pItem.blocks.splice(idx, 0, params as any);
          break;
        case "add_below":
        case "copy":
          pItem.blocks.splice(idx + 1, 0, params as any);
          break;
        default:
          pItem.blocks.push(params as any);
          break;
      }
    }
    if (isThanks) {
      setThanksPage({ ...thanksPage });
    } else {
      setPageList([...pageList]);
    }
  };

  const onDeleteFormItem = (idx: number, pIdx: number, isThanks = false) => {
    if (isThanks) {
      thanksPage.blocks.splice(idx, 1);
      setThanksPage({ ...thanksPage });
    } else {
      pageList[pIdx].blocks.splice(idx, 1);
      setPageList([...pageList]);
    }
  };

  const onValueChange = (
    value: any,
    prop: string | number,
    idx: number,
    pIdx: number,
    isThanks = false
  ) => {
    const pItem = isThanks ? thanksPage : pageList[pIdx];
    const formItem = pItem.blocks[idx];
    formItem[prop as keyof typeof formItem] = value;
    if (isThanks) {
      setThanksPage({ ...thanksPage });
    } else {
      setPageList([...pageList]);
    }
  };

  const onItemOption = (
    idx: number,
    oIdx: number,
    type: string,
    pIdx: number
  ) => {
    if (type === "add") {
      const option = {
        id: getUUID(),
        value: "",
      };
      pageList[pIdx].blocks[idx].options.splice(oIdx + 1, 0, option);
    } else if (type === "delete") {
      pageList[pIdx].blocks[idx].options.splice(oIdx, 1);
    }
    setPageList([...pageList]);
  };

  const onItemOptionValue = (
    idx: number,
    oIdx: string | number,
    pIdx: number,
    e: { target: { textContent: any } }
  ) => {
    const option = pageList[pIdx].blocks[idx].options[oIdx as any];
    (option as any).value = e.target.textContent;
    setPageList([...pageList]);
  };

  const onItemMove = (
    idx: number,
    step: any,
    pIdx: number,
    isThanks = false
  ) => {
    const pItem = isThanks ? thanksPage : pageList[pIdx];
    const item = pItem.blocks.splice(idx, 1)[0];
    pItem.blocks.splice(idx + step, 0, item);
    if (isThanks) {
      setThanksPage({ ...thanksPage });
    } else {
      setPageList([...pageList]);
    }
  };

  // Add or delete page
  const onUpdatePages = (type: string, idx: number | undefined) => {
    if (type === "add") {
      const params = getDefaultPage();
      pageList.push(params);
      setPageList([...pageList]);
    } else if (type === "delete") {
      pageList.splice(idx as number, 1);
      setPageList([...pageList]);
    }
  };

  const onDragEnd = (e: { source: any; destination: any }) => {
    const { source, destination } = e;
    if (source && destination) {
      let sPage = 0;
      let dPage = 0;
      if (
        source.droppableId !== "thank_you_page" &&
        destination.droppableId !== "thank_you_page"
      ) {
        pageList.forEach((page: any, idx: number) => {
          if (page.id === source.droppableId) {
            sPage = idx;
          } else if (page.id === destination.droppableId) {
            dPage = idx;
          }
        });
        const item = pageList[sPage].blocks.splice(source.index, 1)[0];
        pageList[dPage].blocks.splice(destination.index, 0, item);
        setPageList([...pageList]);
      } else if (
        source.droppableId === "thank_you_page" &&
        destination.droppableId === "thank_you_page"
      ) {
        const item = thanksPage.blocks.splice(source.index, 1)[0];
        thanksPage.blocks.splice(destination.index, 0, item);
        setThanksPage({ ...thanksPage });
      } else if (source.droppableId === "thank_you_page") {
        pageList.forEach((page: any, idx: number) => {
          if (page.id === destination.droppableId) {
            sPage = idx;
          }
        });
        const item = thanksPage.blocks.splice(source.index, 1)[0];
        pageList[sPage].blocks.splice(destination.index, 0, item as any);
        setThanksPage({ ...thanksPage });
        setPageList([...pageList]);
      } else if (destination.droppableId === "thank_you_page") {
        pageList.forEach((page: any, idx: number) => {
          if (page.id === destination.droppableId) {
            dPage = idx;
          }
        });
        const item = pageList[dPage].blocks.splice(source.index, 1)[0];
        thanksPage.blocks.splice(destination.index, 0, item);
        setThanksPage({ ...thanksPage });
        setPageList([...pageList]);
      }
    }
    setDragging(false);
  };

  const onBtnValueChange = (
    idx: number,
    e: FocusEvent<HTMLDivElement, Element>
  ) => {
    const page = pageList[idx];
    page.button = e.target.textContent as string;
    setPageList([...pageList]);
  };

  const build = () => {
    if (!buildJson) return;
    const data = JSON.parse(buildJson);
    for (const key in data) {
      if (
        Object.hasOwnProperty.call(data, key) &&
        Object.hasOwnProperty.call(form, key)
      ) {
        form[key as keyof typeof form] = data[key];
      }
    }
    setForm({ ...form });
    if (data.thank_you_page) {
      setThanksPage(data.thank_you_page);
    }
    if (data.pages) {
      setPageList(data.pages);
    }
  };

  const getJson = () => {
    const params = {
      ...form,
      pages: pageList,
      thank_you_page: thanksPage,
    };

    if (window?.editform?.meta_data) {
      axios.put("/admin/forms/" + window?.editform?.id, params).then(() => {
        window.alert("Saved successfully, redirecting ...");
        window.location.href = "/admin/forms";
      });
    } else {
      axios.post("/admin/forms", params).then(() => {
        window.alert("Saved successfully, redirecting ...");
        window.location.href = "/admin/forms";
      });
    }
    // console.log(JSON.stringify(params))
    // window.alert('获取成功，前往控制查看')
  };

  const setFormValue = (value: any, prop: string | number) => {
    form[prop as keyof typeof form] = value;
    setForm({ ...form });
  };

  const setRedirect = (checked: boolean) => {
    thanksPage.redirect = checked;
    setThanksPage({ ...thanksPage });
  };

  const onCustomRedirect = () => {
    thanksPage.redirect = true;
    setThanksPage({ ...thanksPage });
    if (!settingShow) {
      setSettingShow(true);
    }
    setTimeout(() => {
      const ipt = document.getElementById("redirect");
      if (ipt) {
        ipt.focus();
      }
    }, 0);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
      <div className="flex-1 flex">
        <div className="relative flex-1 flex flex-col">
          <div className="flex-1 flex overflow-y-hidden">
            <DragDropContext
              onDragEnd={() => onDragEnd}
              onDragStart={() => {
                setDragging(true);
              }}
            >
              <div className="flex-1 overflow-y-auto">
                <div className="px-16 py-6 hidden">
                  <textarea
                    rows={5}
                    value={buildJson}
                    onChange={(e) => {
                      setBuildJson(e.target.value);
                    }}
                    className="theme-border theme-ring block w-1/2 border-gray-300 border focus:ring rounded focus:outline-none p-2"
                  ></textarea>
                </div>
                <div className="py-6 px-16 flex sticky z-50 top-0 space-x-4 bg-gray-100 border-b">
                  <button
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    onClick={getJson}
                  >
                    Save
                  </button>
                  {!settingShow && (
                    <div className="">
                      <button
                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => {
                          setSettingShow(true);
                        }}
                      >
                        <span>Settings</span>
                      </button>
                    </div>
                  )}
                  <button
                    className="py-2 px-4 bg-blue-400 rounded focus:ring text-white hidden"
                    onClick={build}
                  >
                    Build
                  </button>
                </div>
                {pageList.map((page: any, pIdx: number) => {
                  return (
                    <div key={page.id}>
                      <Droppable droppableId={page.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="relative"
                          >
                            {pIdx > 0 && (
                              <>
                                <PageSetting
                                  onDeletePage={() => {
                                    onUpdatePages("delete", pIdx);
                                  }}
                                >
                                  <div className="absolute top-0 right-0 mt-8 mr-8 z-50">
                                    <button className="group h-12 w-12 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset">
                                      <SeetingIcon classList="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                                    </button>
                                  </div>
                                </PageSetting>
                                <div className="absolute top-0 left-0 ml-12 -mt-8">
                                  <span className="text-xs font-bold text-gray-400">
                                    Page {pIdx + 1}
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="form-container w-full max-w-base mx-auto px-4 py-16">
                              {form.branding.logo && pIdx === 0 && (
                                <div
                                  className={`logo 
                                        ${
                                          form.branding.logoSize === "small"
                                            ? "h-8"
                                            : form.branding.logoSize ===
                                              "medium"
                                            ? "h-10"
                                            : "h-12"
                                        }`}
                                >
                                  <img
                                    src={form.branding.logo}
                                    className="block w-auto h-full"
                                  />
                                </div>
                              )}
                              {page.blocks.map((item: any, idx: number) => {
                                return (
                                  <FormItemBase
                                    draggableId={`item-${item.id}`}
                                    index={idx}
                                    length={page.blocks.length}
                                    key={item.id}
                                    formItem={item}
                                    dragging={dragging}
                                    onAddFormItem={(
                                      name: string,
                                      type: string,
                                      idx: number
                                    ) => {
                                      onUpdateOrAddItem(name, type, idx, pIdx);
                                    }}
                                    onDeleteItem={(idx: number) => {
                                      onDeleteFormItem(idx, pIdx);
                                    }}
                                    onItemMove={(idx: number, step: any) => {
                                      onItemMove(idx, step, pIdx);
                                    }}
                                    onInputChange={(
                                      value: any,
                                      prop: string | number
                                    ) => {
                                      onValueChange(value, prop, idx, pIdx);
                                    }}
                                  >
                                    <FormItem
                                      item={item}
                                      onItemOption={(
                                        oIdx: number,
                                        type: string
                                      ) => {
                                        onItemOption(idx, oIdx, type, pIdx);
                                      }}
                                      onItemOptionValue={(
                                        oIdx: string | number,
                                        e: { target: { textContent: any } }
                                      ) => {
                                        onItemOptionValue(idx, oIdx, pIdx, e);
                                      }}
                                      onInputChange={(
                                        value: any,
                                        prop: string | number
                                      ) => {
                                        onValueChange(value, prop, idx, pIdx);
                                      }}
                                    />
                                  </FormItemBase>
                                );
                              })}
                              {provided.placeholder}
                              {/* add block */}
                              <div className="flex justify-center my-16">
                                <FormBlock
                                  onAddFormItem={(
                                    name: string,
                                    type: string,
                                    idx: number
                                  ) => {
                                    onUpdateOrAddItem(name, type, idx, pIdx);
                                  }}
                                  type="add"
                                >
                                  <button className="flex justify-center items-center font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring">
                                    <AddIcon classList="text-gray-500 w-4 h-4 mr-2" />
                                    Add form block
                                  </button>
                                </FormBlock>
                              </div>
                              <div className="group relative submit isolate">
                                <div className="relative">
                                  <div className="absolute -z-1 rounded-md -top-4 -right-4 -bottom-4 -left-4 group-focus-within:bg-gray-100 group-hover:bg-gray-100 group-settings-open:bg-gray-100"></div>
                                  <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                      onBtnValueChange(pIdx, e);
                                    }}
                                    className="theme-button theme-ring block w-full text-center font-semibold tracking-tight rounded py-4 transition-colors duration-100 ease-out remove-outline focus:outline-none focus-visible:outline-none cursor-text focus:outline-none prevent-collapse"
                                  >
                                    {page.button}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Droppable>
                      <div className="flex justify-center bg-gray-50 py-8">
                        <button
                          onClick={() => {
                            onUpdatePages("add", pIdx);
                          }}
                          className="flex justify-center items-center font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded text-sm"
                        >
                          <AddIcon classList="text-gray-500 w-4 h-4 mr-2" />
                          Add page
                        </button>
                      </div>
                    </div>
                  );
                })}
                {thanksPage &&
                  thanksPage.blocks.length > 0 &&
                  !thanksPage.redirect && (
                    <Droppable droppableId="thank_you_page">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="relative"
                        >
                          <ThanksPageSetting
                            onCustomRedirect={onCustomRedirect}
                          >
                            <div className="absolute top-0 right-0 mt-8 mr-8 z-50">
                              <button className="group h-12 w-12 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset">
                                <SeetingIcon classList="h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                              </button>
                            </div>
                          </ThanksPageSetting>
                          <div className="absolute top-0 left-0 ml-12 -mt-8">
                            <span className="text-xs font-bold text-gray-400">
                              Thank you page
                            </span>
                          </div>
                          <div className="form-container w-full max-w-base mx-auto px-4 py-16">
                            {thanksPage.blocks.map((item, idx) => {
                              return (
                                <FormItemBase
                                  draggableId={`item-${item.id}`}
                                  index={idx}
                                  length={thanksPage.blocks.length}
                                  key={item.id}
                                  formItem={item}
                                  showInput={false}
                                  dragging={dragging}
                                  onAddFormItem={(
                                    name: string,
                                    type: string,
                                    idx: number
                                  ) => {
                                    onUpdateOrAddItem(name, type, idx, 0, true);
                                  }}
                                  onDeleteItem={(idx: number) => {
                                    onDeleteFormItem(idx, 0, true);
                                  }}
                                  onItemMove={(idx: number, step: any) => {
                                    onItemMove(idx, step, 0, true);
                                  }}
                                  onInputChange={(
                                    value: any,
                                    prop: string | number
                                  ) => {
                                    onValueChange(value, prop, idx, 0, true);
                                  }}
                                >
                                  <FormItem
                                    item={item}
                                    onInputChange={(
                                      value: any,
                                      prop: string | number
                                    ) => {
                                      onValueChange(value, prop, idx, 0, true);
                                    }}
                                  />
                                </FormItemBase>
                              );
                            })}
                            {provided.placeholder}
                            {/* add block */}
                            <div className="flex justify-center my-16">
                              <FormBlock
                                onAddFormItem={(
                                  name: string,
                                  type: string,
                                  idx: number
                                ) => {
                                  onUpdateOrAddItem(name, type, idx, 0, true);
                                }}
                                type="add"
                                showInput={false}
                              >
                                <button className="flex justify-center items-center font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring">
                                  <AddIcon classList="text-gray-500 w-4 h-4 mr-2" />
                                  Add form block
                                </button>
                              </FormBlock>
                            </div>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  )}
              </div>
            </DragDropContext>
            {settingShow && (
              <FormSetting
                form={form}
                redirect={thanksPage.redirect}
                setFormValue={setFormValue}
                // setFormBrandValue={setFormBrandValue}
                setRedirect={setRedirect}
                onClose={() => {
                  setSettingShow(false);
                }}
              />
            )}
          </div>
          {/* <div className="px-6 bg-white z-50 border-t border-gray-100 flex items-center justify-end md:justify-between py-4 md:px-12">
            <a
              href="#"
              className="rounded focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm font-semibold transition-colors duration-100 ease-out focus:ring disabled:cursor-not-allowed px-8 py-2 bg-white border-2 border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 mr-4">
              Preview
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
