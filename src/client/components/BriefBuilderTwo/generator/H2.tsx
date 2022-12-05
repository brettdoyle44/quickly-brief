export default function (props: any) {
  return (
    <h2
      contentEditable
      suppressContentEditableWarning
      data-placeholder="Enter a subheading"
      className="font-bold text-2xl cursor-text tracking-tight text-gray-900 focus:outline-none"
    >
      {props.children}
    </h2>
  );
}
