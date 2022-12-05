export default function (props: any) {
  return (
    <h1
      contentEditable
      suppressContentEditableWarning
      data-placeholder="Enter a form heading"
      className="font-bold text-3xl cursor-text tracking-tight text-gray-900 focus:outline-none"
    >
      {props.children}
    </h1>
  );
}
