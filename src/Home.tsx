import React from "react";
import { Tabs, Icon } from "antd";
import "./Home.css";
import { GET_ROOMS } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";
import ChatRoom from "./home/ChatRoom";
import CreateChannel from "./home/CreateChannel";
import LoadingContainer from "./components/LoadingContainer";
import NotJoinedRoom from "./home/NotJoinedRoom";

const { TabPane } = Tabs;
interface Props {
  currentUser: any;
}

const Home = ({ currentUser }: Props) => {
  const { loading, data: dataRooms } = useQuery(GET_ROOMS);
  if (loading) return <LoadingContainer />;
  const { rooms, id: userId } = currentUser;
  const notJoinedRooms = dataRooms.rooms.filter(
    room => !rooms.find(roomJoined => roomJoined.id === room.id)
  );

  const isJoinedRoomsEmpty = rooms.length === 0;
  const isRoomsEmpty = dataRooms.rooms.length === 0;
  const createChannelKey = "create-channel";

  return (
    <div>
      <Tabs
        defaultActiveKey={
          isRoomsEmpty || isJoinedRoomsEmpty
            ? createChannelKey
            : `channel-${rooms[0].id}`
        }
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
          key={createChannelKey}
          className="messages-group"
        >
          <CreateChannel />
        </TabPane>
        {rooms.map(room => {
          const { name, id } = room;
          return (
            <TabPane
              tab={
                <span>
                  <Icon type="home" />
                  {name}
                </span>
              }
              key={`channel-${id}`}
              className="messages-group"
              forceRender
            >
              <ChatRoom room={room} userId={userId} key={room.id} />
            </TabPane>
          );
        })}
        {notJoinedRooms.map(room => {
          const { name, id } = room;
          return (
            <TabPane
              tab={`# ${name}`}
              key={`channel-${id}`}
              className="messages-group"
            >
              <NotJoinedRoom roomID={id} userID={currentUser.id} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
