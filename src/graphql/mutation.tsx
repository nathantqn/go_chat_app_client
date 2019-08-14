import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      rooms {
        id
        name
        messages {
          id
          text
          postedAt: createdAt
          user {
            id
            name
          }
        }
      }
    }
  }
`;

export const SUBMIT_MESSAGE = gql`
  mutation submitMessage($input: NewMessage!) {
    createMessage(input: $input) {
      id
      text
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation createChannel($input: NewRoom!) {
    createRoom(input: $input) {
      id
      name
    }
  }
`;
