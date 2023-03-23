import { ContactData } from '../../models/ContactModels';


export interface ContactStateInterface {
  contactData: ContactData
}

const state = (): ContactStateInterface => {
  return {
    contactData:  <ContactData>{}
  };
};

export default state;
