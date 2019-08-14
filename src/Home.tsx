import React from "react";
import { Tabs, Icon } from "antd";
import "./Home.css";
import { GET_CURRENT_USER } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";
import ChatRoom from "./home/ChatRoom";
import CreateChannel from "./home/CreateChannel";

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
        <TabPane
          tab={
            <span>
              <Icon type="plus-circle" />
              Create Channel
            </span>
          }
          key={"create-channel"}
          className="messages-group"
        >
          <CreateChannel />
        </TabPane>
        {rooms.map(room => {
          const { name, id } = room;
          return (
            <TabPane
              tab={`# ${name}`}
              key={`channel-${id}`}
              className="messages-group"
            >
              <ChatRoom room={room} userId={userId} key={room.id} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
