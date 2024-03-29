import React, { useState } from "react";
import { Input, Button } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_CHANNEL } from "../graphql/mutation";
import { GET_CURRENT_USER, GET_ROOMS } from "../graphql/query";

const CreateChannel = () => {
  const [name, setName] = useState();
  const handeChangeName = e => {
    setName(e.target.value);
  };
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [createChannel, { loading: createChannelLoading }] = useMutation(
    CREATE_CHANNEL,
    {
      variables: {
        input: {
          name,
          userID: data.currentUser.id
        }
      },
      update(cache, { data: { createRoom } }) {
        const currentUserData: any = cache.readQuery({
          query: GET_CURRENT_USER
        });
        const { currentUser } = currentUserData;
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            currentUser: {
              ...currentUser,
              rooms: [...currentUser.rooms, createRoom]
            }
          }
        });
        const roomsData: any = cache.readQuery({
          query: GET_ROOMS
        });
        const { rooms } = roomsData;
        cache.writeQuery({
          query: GET_ROOMS,
          data: {
            rooms: [...rooms, createRoom]
          }
        });
      }
    }
  );
  return (
    <div className="create-channel-form-container">
      <Input
        size="large"
        placeholder="Channel Name"
        className="channel-name-input"
        onChange={handeChangeName}
        value={name}
      />
      <Button
        type="primary"
        block
        className="create-channel-btn"
        loading={createChannelLoading}
        onClick={createChannel as any}
      >
        Create Channel
      </Button>
    </div>
  );
};

export default CreateChannel;
