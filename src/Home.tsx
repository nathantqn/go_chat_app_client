import React from "react";
import { Tabs, List, Avatar } from "antd";
import "./Home.css";
import TextArea from "antd/lib/input/TextArea";

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 3"
  }
];
const { TabPane } = Tabs;
const Home = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" className="rooms-list">
        {[...Array(30).keys()].map(i => (
          <TabPane
            tab={`Tab-${i}-heheheheheheheheheh`}
            key={`tab-${i}`}
            className="messages-group"
          >
            <List
              className="messages-list"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
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
        ))}
      </Tabs>
    </div>
  );
};

export default Home;
