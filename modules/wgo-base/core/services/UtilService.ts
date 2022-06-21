import dayjs from "dayjs";

export const UtilService = {
  parseDate(date: Date | string, format: string = "DD/MM/YYYY HH:mm") {
    if (!date) return "";
    return dayjs(date).format(format);
  },
};
