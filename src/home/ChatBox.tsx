import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useMutation } from "@apollo/react-hooks";
import { SUBMIT_MESSAGE } from "../graphql/mutation";

interface Props {
  roomId: number;
  userId: number;
}

const ChatBox = ({ roomId, userId }: Props) => {
  const [message, setMessage] = useState();
  const [submitMessage] = useMutation(SUBMIT_MESSAGE, {
    variables: {
      input: {
        text: message,
        userId,
        roomId
      }
    }
  });
  const handeChangeMessage = e => {
    setMessage(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitMessage();
      setMessage("");
    }
  };
  return (
    <TextArea
      rows={2}
      style={{
        width: "100%",
        padding: 10,
        height: "15vh",
        marginRight: 15,
        marginTop: 10
      }}
      onChange={handeChangeMessage}
      value={message}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChatBox;
