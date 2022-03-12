import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKConfig, CKOnReady } from "./utils";

export default function Editor({
  initValue = "",
  readOnly,
  onData,
}: any): React.ReactElement {
  function handleChange(evt: any, editor: any) {
    onData && onData(editor.getData());
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={initValue}
      onReady={CKOnReady}
      config={CKConfig}
      onChange={handleChange}
    />
  );
}
