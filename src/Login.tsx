import React from "react";
import { Input, Button } from "antd";
import "./Home.css";

const Login = () => {
  return (
    <div className="login-form-container">
      <Input size="large" placeholder="Your Name" className="login-input" />
      <Button type="primary" block className="login-btn">
        Login
      </Button>
    </div>
  );
};

export default Login;
