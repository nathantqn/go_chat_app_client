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

export const ON_ROOM_ADDED = gql`
  subscription onRoomAdded($userID: ID!) {
    roomAdded(userID: $userID) {
      id
      name
      messages {
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
  }
`;
