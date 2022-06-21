import gql from 'graphql-tag';

export const Q_EMAILMEDIA_GETALL = gql`
  query getAllEmailMedia($data: EmailMediaFilterInput!) {
    getAllEmailMedia(data: $data) {
      id
      name
      senderTo
      fileName
      fileExt
      fileExt
      isPublic
      contentId
      contentType
      size
      emailId
    }
  }
`;

export const Q_EMAILMEDIA_GETEMAIL = gql`
  query getEmail($data: IdInput!) {
    getEmail(data: $data) {
      id
      from
      to
      cc
      bcc
      subject
      subject
      headers
      date
      messageId
      inReplyTo
      replyTo
      references
      html
      text
      textAsHtml
      attachments {
        id
        name
        senderTo
        fileName
        fileExt
        fileExt
        isPublic
        contentId
        contentType
        size
        emailId
      }
    }
  }
`;
