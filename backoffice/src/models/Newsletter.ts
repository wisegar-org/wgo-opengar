export enum AGVNewsletterInscriptionStatusEnum {
  Waiting = "In sospeso",
  Confirmed = "Confermato",
  Cancelled = "Annullato",
}

export function getAGVNewsletterMessageStatusEnum(value: string) {
  switch (value) {
    case AGVNewsletterMessageStatusEnum.Sended:
      return AGVNewsletterMessageStatusEnum.Sended;
    case AGVNewsletterMessageStatusEnum.Waiting:
      return AGVNewsletterMessageStatusEnum.Waiting;
    default:
      throw new Error(
        `Case ${value} not found on AGVNewsletterMessageStatusEnum`
      );
  }
}

export enum AGVNewsletterMessageStatusEnum {
  Waiting = "In sospeso",
  Sended = "Inviato",
}

export interface AGVNewsletterInscriptionModel {
  id: number;
  email: string;
  status: AGVNewsletterInscriptionStatusEnum;
}

export interface AGVNewsletterMessageModel {
  id: number;
  title: string;
  message: string;
  status?: string;
}
