import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SUBMIT_MESSAGE } from "../graphql/mutation";
import { GET_CURRENT_USER } from "../graphql/query";

interface Props {
  roomId: number;
}

const ChatBox = ({ roomId }: Props) => {
  const [message, setMessage] = useState();
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [submitMessage] = useMutation(SUBMIT_MESSAGE, {
    variables: {
      input: {
        text: message,
        userId: data.currentUser.id,
        roomId
      }
    }
  });
  const handeChangeMessage = e => {
    setMessage(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
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
