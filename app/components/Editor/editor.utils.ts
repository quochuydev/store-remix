import { fileService } from "~/services";

const config = {
  server: "",
};

const CKOnReady = (editor: any) => {
  if (!editor) {
    return;
  }

  editor.plugins.get("FileRepository").createUploadAdapter = function (
    loader: any
  ) {
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
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);
    return new Promise(async (resolve, reject) => {
      try {
        const result: any = await fileService.create(file);
        if (!result) {
          throw new Error();
        }

        console.log(result);
        const resData: any = result.data ? result.data : result;
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

export { CKConfig, CKUploadAdapter, CKOnReady };
