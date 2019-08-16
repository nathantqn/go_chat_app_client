import React from "react";
import { Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { JOIN_CHANNEL } from "../graphql/mutation";
import { GET_CURRENT_USER } from "../graphql/query";

interface Props {
  roomID: number;
  userID: number;
}

const NotJoinedRoom = ({ roomID, userID }: Props) => {
  const [joinChannel, { loading }] = useMutation(JOIN_CHANNEL, {
    variables: {
      input: {
        roomID,
        userID
      }
    },
    update(cache, { data: { joinRoom } }) {
      const currentUserData: any = cache.readQuery({ query: GET_CURRENT_USER });
      const { currentUser } = currentUserData;
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          currentUser: {
            ...currentUser,
            rooms: [...currentUser.rooms, joinRoom]
          }
        }
      });
    }
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Button type="primary" onClick={joinChannel as any} loading={loading} size="large">
        Join This Channel
      </Button>
    </div>
  );
};

export default NotJoinedRoom;
