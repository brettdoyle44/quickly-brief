import { useState, useRef } from "react";
import BaseInput from "./BaseInput";
import axios from "axios";

export default function (props: { onInputChange?: any; item?: any }) {
  const { item = {} } = props;
  const upladRef = useRef<any>();
  const [uploading, setUploading] = useState(false);

  const onFileChoose = () => {
    upladRef.current.click();
  };

  const onFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  const onFileDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: Iterable<string> | ArrayLike<string> };
  }) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files)[0];
    onUpload(file);
  };

  const onUpload = (file: string) => {
    if (file) {
      const formData = new FormData();
      formData.append("images", file);
      setUploading(true);

      axios
        .post("/admin/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          props.onInputChange(res.data.url, "url");
        })
        .catch((err) => {
          window.alert("上传图片失败");
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  return (
    <BaseInput item={item} onInputChange={props.onInputChange}>
      <div
        className="h-40 bg-white cursor-pointer flex items-center justify-center border-2 rounded border-dotted border-gray-400"
        onClick={onFileChoose}
        onDrop={() => onFileDrop}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="file"
          ref={upladRef}
          className="sr-only hidden file"
          autoComplete="off"
          tabIndex={-1}
          onChange={() => onFileChange}
        />
        <div>
          {uploading
            ? "Uploading..."
            : "Select a file or drag and drop it to here"}
        </div>
      </div>
    </BaseInput>
  );
}
