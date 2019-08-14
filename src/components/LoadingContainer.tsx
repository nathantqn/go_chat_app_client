import React from "react";
import { Icon, Spin } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

const LoadingContainer = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingContainer;
