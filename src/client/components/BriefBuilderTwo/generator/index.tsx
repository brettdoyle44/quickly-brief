import H1 from "./H1";
import H2 from "./H2";
import ShortInput from "./ShortInput";

export default function Generator({ htmlItem, label }: any) {
  if (htmlItem === "h1") {
    return (
      <>
        <H1>{label}</H1>
      </>
    );
  }
  if (htmlItem === "h2") {
    return (
      <>
        <H2>{label}</H2>
      </>
    );
  }
  if (htmlItem === "text") {
    return (
      <>
        <p>{label}</p>
      </>
    );
  }
  if (htmlItem === "input") {
    return <ShortInput label={label} />;
  }
  if (htmlItem === "checkbox") {
    return (
      <>
        <p>Checkbox here</p>
      </>
    );
  }
  if (htmlItem === "date") {
    return (
      <>
        <p>Date is here</p>
      </>
    );
  }
  if (htmlItem === "attachment") {
    return (
      <>
        <p>Attachment here</p>
      </>
    );
  }

  return <div></div>;
}
