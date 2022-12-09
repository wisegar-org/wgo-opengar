export const UtilService = {
  async readStreamData(stream: any) {
    return new Promise((res, rej) => {
      let dataStm: any[] = [];
      stream
        .on("error", () => {
          rej(null);
        })
        .on("data", (data: any) => {
          dataStm.push(data);
        })
        .on("end", () => {
          res(Buffer.concat(dataStm));
        });
    });
  },
};
