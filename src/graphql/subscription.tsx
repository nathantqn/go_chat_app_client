import gql from "graphql-tag";

export const ON_MESSAGE_CREATED = gql`
  subscription onMessageCreated($roomID: ID!, $userID: ID!) {
    messageCreated(roomID: $roomID, userID: $userID) {
      id
      text
      postedAt: createdAt
      user {
        id
        name
        avatarURL
      }
    }
  }
`;
