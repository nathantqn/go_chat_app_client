import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { ON_MESSAGE_CREATED } from "../graphql/subscription";
import { List, Avatar } from "antd";
import ChatBox from "./ChatBox";
import moment from "moment";

interface Room {
  id: number;
  name: string;
  messages: any[];
}

interface Prop {
  room: Room;
  userId: number;
}

const ChatRoom = ({ room, userId }: Prop) => {
  const { id, messages } = room as Room;
  const { data: dataSubscribe, loading: loadingSub } = useSubscription(
    ON_MESSAGE_CREATED,
    {
      variables: {
        roomID: id,
        userID: userId
      }
    }
  );

  let messagesRender = messages;
  if (!loadingSub) {
    messagesRender = [...messagesRender, dataSubscribe.messageCreated];
  }

  return (
    <>
      <List
        className="messages-list"
        itemLayout="horizontal"
        dataSource={messagesRender}
        renderItem={message => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{message.user.name}</a>}
              description={message.text}
            />
            <div style={{ marginRight: 20 }}>
              {moment(message.postedAt).format("HH:MM - YYYY/MM/DD")}
            </div>
          </List.Item>
        )}
      />
      <ChatBox roomId={id} userId={userId} />
    </>
  );
};

export default ChatRoom;
