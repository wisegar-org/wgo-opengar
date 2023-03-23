import gql from 'graphql-tag';

export const Q_EMAIL_SENDEMAIL = gql`
  query sendEmail($data: EmailInputGQL!) {
    sendEmail(data: $data) {
      isSuccess
      error
      message
    }
  }
`;

export const Q_EMAIL_SENDEMAILTOAPP = gql`
  query sendEmailToApp($data: EmailToAppInputGQL!) {
    sendEmailToApp(data: $data) {
      isSuccess
      error
      message
    }
  }
`;

export const Q_EMAIL_SENDEMAILFROMTOAPP = gql`
  query sendEmailFromToApp($data: EmailFromToAppInputGQL!) {
    sendEmailFromToApp(data: $data) {
      isSuccess
      error
      message
    }
  }
`;

export const Q_EMAIL_SENDEMAILTOADDRESSANDAPP = gql`
  query sendEmailFromToAddressAndApp($data: EmailToAddressAndAppInputGQL!) {
    sendEmailFromToAddressAndApp(data: $data) {
      isSuccess
      error
      message
    }
  }
`;
