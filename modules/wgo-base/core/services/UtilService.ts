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
          result = result || item.link === activeRoute;
          break;
        }
      }
    });
    return result;
  },
  removeTags(str: string) {
    const strBr = (str || "")
      .split("<div>")
      .map((text) => text.replace(/(<([^>]+)>)/gi, ""))
      .join("<br/>");
    return strBr.startsWith("<br/>") ? strBr.replace("<br/>", "") : strBr;
  },
  isValidEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};
