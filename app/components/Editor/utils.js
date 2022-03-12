import { fileService } from "~/services";

export { CKConfig, CKUploadAdapter, CKOnReady };

const config = {
  server: "",
};

const CKOnReady = (editor) => {
  if (!editor) {
    return;
  }

  editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
    return new CKUploadAdapter(loader);
  };
};

const CKConfig = {
  basicEntities: false,
  ckfinder: {
    uploadUrl: `${config.server}/api/files`,
  },
};

class CKUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fileService.create(data);
        if (!res) {
          throw new Error();
        }

        var resData = res.data;
        console.log(resData);
        resData.default = resData.url;
        resolve(resData);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  abort() {}
}
