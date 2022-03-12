import React from "react";
import { fileService } from "~/services";

export default function Uploader(props) {
  const { name, onSuccess, onError } = props;

  return (
    <input
      type="file"
      id={name}
      name={name}
      className="sr-only"
      onChange={async (event) => {
        try {
          const file = event.target?.files[0];
          const formData = new FormData();
          formData.append("files", file);
          const result = await fileService.create(formData);
          console.log(result?.data);
          onSuccess && onSuccess(result?.data);
        } catch (error) {
          onError && onError(error);
        }
      }}
    />
  );
}