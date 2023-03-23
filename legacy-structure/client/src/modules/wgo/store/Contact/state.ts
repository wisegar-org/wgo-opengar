import { IContact } from '../../models/IContact';


export interface WGOContactStateInterface {
  contactData: IContact
}

const state = (): WGOContactStateInterface => {
  return {
    contactData:  <IContact>{}
  };
};

export default state;
