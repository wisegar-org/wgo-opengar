export interface IContactModel {
  contactName: string;
  address: string;
  email: string;
  phoneNumber: string;
  mapPath: string;
}

export interface IContactMeInput {
  contactName?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  mapPath?: string;
}
