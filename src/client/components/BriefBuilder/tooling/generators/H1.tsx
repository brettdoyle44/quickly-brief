import { ReactChild, ReactFragment, ReactPortal } from "react";

export default function (props: {
  onInputChange: (arg0: any, arg1: string) => void;
  item: {
    content:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  };
}) {
  const onContentBlur = (e: { target: { textContent: any } }) => {
    props.onInputChange(e.target.textContent, "content");
  };

  return (
    <h1
      onBlur={onContentBlur}
      contentEditable
      suppressContentEditableWarning
      data-placeholder="Enter a form heading"
      className="font-bold text-3xl cursor-text tracking-tight text-gray-900 focus:outline-none"
    >
      {props.item.content}
    </h1>
  );
}
