import H1 from "./H1";
import H2 from "./H2";
import Text from "./Text";
import LongTextInput from "./LongTextInput";
import HiddenInput from "./HiddenInput";
import RadioInput from "./RadioInput";
import CheckboxInput from "./CheckboxInput";
import ScaleInput from "./ScaleInput";
import NormalInput from "./NormalInput";
import FileUpload from "./FileUpload";

const formItem = {
  h1: H1,
  h2: H2,
  rich_text: Text,
  name: NormalInput,
  email: NormalInput,
  text: NormalInput,
  textarea: LongTextInput,
  number: NormalInput,
  url: NormalInput,
  hidden: HiddenInput,
  radio: RadioInput,
  checkbox: CheckboxInput,
  scale: ScaleInput,
  file_upload: FileUpload,
};

export default function (props: any) {
  const FormItem = formItem[props.item.type as keyof typeof formItem];
  if (!FormItem) return null;
  return <FormItem {...props} />;
}
