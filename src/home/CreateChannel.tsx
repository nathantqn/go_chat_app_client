import React, { useState } from "react";
import { Input, Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CHANNEL } from "../graphql/mutation";

const CreateChannel = () => {
  const [name, setName] = useState();
  const handeChangeName = e => {
    setName(e.target.value);
  };
  const [createChannel, { loading: createChannelLoading }] = useMutation(
    CREATE_CHANNEL,
    {
      variables: {
        input: {
          name
        }
      },
      onCompleted: () => {
        setName(undefined);
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
