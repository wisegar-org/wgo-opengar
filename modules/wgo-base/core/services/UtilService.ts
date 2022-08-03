import dayjs from "dayjs";
import currency from "currency.js";
import { MenuListItem } from "../models/Menu";

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
  roundNumber(value: number, decimal?: number) {
    if (!value) return value;
    const roundValue = currency(value, {
      symbol: "",
      separator: "'",
      precision: decimal || 2,
    }).format();
    return parseFloat(roundValue);
  },
  isListActive(activeRoute: string, items: MenuListItem[]) {
    let result = false;
    items.forEach((item) => {
      switch (item.type) {
        case "group": {
          result = result || UtilService.isListActive(activeRoute, item.items);
          break;
        }
        case "item": {
          result = item.link === activeRoute;
          break;
        }
      }
    });
    return result;
  },
};
