import React, { useState } from "react";
import { Tabs, Icon } from "antd";
import "./Home.css";
import { GET_ROOMS } from "./graphql/query";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import ChatRoom from "./home/ChatRoom";
import CreateChannel from "./home/CreateChannel";
import LoadingContainer from "./components/LoadingContainer";
import NotJoinedRoom from "./home/NotJoinedRoom";
import { ON_ROOM_ADDED } from "./graphql/subscription";
import { OnSubscriptionDataOptions } from "@apollo/react-common";

const { TabPane } = Tabs;
interface Props {
  currentUser: any;
}

const Home = ({ currentUser }: Props) => {
  const [currentTab, setCurrentTab] = useState()

  const handleChangeTab = (currentTab) => {
    setCurrentTab(currentTab)
  }

  const handleNewRoomAdded = ({
    subscriptionData,
    client
  }: OnSubscriptionDataOptions<any>) => {
    const { roomAdded } = subscriptionData.data;
    const roomsData: any = client.readQuery({
      query: GET_ROOMS
    });
    const { rooms } = roomsData;
    client.writeQuery({
      query: GET_ROOMS,
      data: {
        rooms: [...rooms, roomAdded]
      }
    });
  }

  useSubscription(ON_ROOM_ADDED, {
    variables: {
      userID: currentUser.id
    }, onSubscriptionData: handleNewRoomAdded
  })

  const { loading, data: dataRooms } = useQuery(GET_ROOMS);
  if (loading) return <LoadingContainer />;
  const { rooms, id: userId } = currentUser;
  const notJoinedRooms = dataRooms.rooms.filter(
    room => !rooms.find(roomJoined => roomJoined.id === room.id)
  );
  const createChannelKey = "create-channel";

  return (
    <div>
      <Tabs
        activeKey={currentTab}
        onChange={handleChangeTab}
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
                  <Icon type="home" theme="filled" />
                  {name}
                </span>
              }
              key={`channel-${id}`}
              className="messages-group"
              forceRender
            >
              <ChatRoom room={room} userId={userId} key={room.id}
                currentTab={currentTab} handleChangeTab={handleChangeTab} />
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
