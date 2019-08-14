import React, { useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { ON_MESSAGE_CREATED } from "../graphql/subscription";
import { List, Avatar } from "antd";
import ChatBox from "./ChatBox";
import moment from "moment";
import { OnSubscriptionDataOptions } from "@apollo/react-common";
import { animateScroll as scroll } from "react-scroll";
import "./ChatRoom.css";

import { Element } from "react-scroll";
import gql from "graphql-tag";

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
  const scrollSectionId = `chat-list-room${id}`;
  useEffect(() => {
    scroll.scrollToBottom({
      containerId: scrollSectionId,
      duration: 400
    });
  }, [scrollSectionId]);

  const handleNewMessageReceived = ({
    subscriptionData,
    client
  }: OnSubscriptionDataOptions<any>) => {
    const { messageCreated } = subscriptionData.data;
    const roomCacheID = `Room:${id}`;
    const roomFragment = gql`
      fragment updatedRoom on Room {
        id
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
    `;
    const updatedRoom = client.readFragment({
      id: roomCacheID,
      fragment: roomFragment
    });

    client.writeFragment({
      id: roomCacheID,
      fragment: roomFragment,
      data: {
        ...updatedRoom,
        messages: [...updatedRoom.messages, messageCreated]
      }
    });

    scroll.scrollToBottom({
      containerId: scrollSectionId,
      duration: 200
    });
  };

  useSubscription(ON_MESSAGE_CREATED, {
    variables: {
      roomID: id,
      userID: userId
    },
    onSubscriptionData: handleNewMessageReceived
  });

  return (
    <>
      <Element className="scroll-container" id={scrollSectionId}>
        <List
          className="messages-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={message => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={message.user.avatarURL} />}
                title={<a href="https://ant.design">{message.user.name}</a>}
                description={message.text}
              />
              <div style={{ marginRight: 20 }}>
                {moment(message.postedAt).format("HH:MM - YYYY/MM/DD")}
              </div>
            </List.Item>
          )}
        />
      </Element>
      <ChatBox roomId={id} userId={userId} />
    </>
  );
};

export default ChatRoom;
