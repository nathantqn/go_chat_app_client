import React from "react";
import { Row, Col, Input, Button } from "antd";
import "./Home.css";

const Login = () => {
  return (
    <Row gutter={16}>
      <Col span={6} />
      <Col span={12}>
        <div className="login-form-container">
          <Input size="large" placeholder="Your Name" className="login-input" />
          <Button type="primary" block className="login-btn">
            Login
          </Button>
        </div>
      </Col>
      <Col span={6} />
    </Row>
  );
};

export default Login;
