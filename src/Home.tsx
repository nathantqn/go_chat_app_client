import React from "react";
import { Tabs, List, Avatar } from "antd";
import "./Home.css";
import TextArea from "antd/lib/input/TextArea";
import { GET_CURRENT_USER } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

interface Room {
  id: number;
  name: string;
  messages: any[];
}

const { TabPane } = Tabs;
const Home = () => {
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const { rooms } = data.currentUser;

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

              <TextArea
                rows={2}
                style={{
                  width: "100%",
                  padding: 10,
                  height: "15vh",
                  marginRight: 15,
                  marginTop: 10
                }}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
