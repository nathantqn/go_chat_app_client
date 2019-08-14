import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  query rooms {
    rooms {
      name
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser @client {
      name
      id
      rooms {
        name
        id
      }
    }
  }
`;
