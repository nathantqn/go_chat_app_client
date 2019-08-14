import React from "react";
import { Tabs, List, Avatar } from "antd";
import "./Home.css";
import { GET_CURRENT_USER } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import ChatBox from "./home/ChatBox";

interface Room {
  id: number;
  name: string;
  messages: any[];
}

const { TabPane } = Tabs;
const Home = () => {
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const { rooms, id: userId } = data.currentUser;

  return (
    <div>
      <Tabs
        defaultActiveKey={rooms[0].id}
        tabPosition="left"
        className="rooms-list"
      >
        {rooms.map(room => {
          const { id, name, messages } = room as Room;
          return (
            <TabPane
              tab={name}
              key={`channel-${id}`}
              className="messages-group"
            >
              <List
                className="messages-list"
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={message => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <a href="https://ant.design">{message.user.name}</a>
                      }
                      description={message.text}
                    />
                    <div style={{ marginRight: 20 }}>
                      {moment(message.postedAt).format("HH:MM - YYYY/MM/DD")}
                    </div>
                  </List.Item>
                )}
              />
              <ChatBox roomId={id} userId={userId} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
