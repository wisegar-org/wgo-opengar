import dayjs from "dayjs";

export const UtilService = {
  parseDate(date: Date | string, format: string = "DD/MM/YYYY HH:mm") {
    if (!date) return "";
    return dayjs(date).format(format);
  },
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
