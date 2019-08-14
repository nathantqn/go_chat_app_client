import React, { useState } from "react";
import { Input, Button } from "antd";
import "./Login.css";
import { LOGIN } from "./graphql/mutation";
import { useMutation } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "./graphql/query";

const Login = () => {
  const [name, setName] = useState();
  const handeChangeName = e => {
    setName(e.target.value);
  };
  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    variables: {
      input: {
        name
      }
    },
    update(cache, { data: { login } }) {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          currentUser: {
            ...login
          }
        }
      });
    }
  });
  return (
    <div className="login-form-container">
      <Input
        size="large"
        placeholder="Your Name"
        className="login-input"
        onChange={handeChangeName}
        value={name}
      />
      <Button
        type="primary"
        block
        className="login-btn"
        loading={loginLoading}
        onClick={login as any}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
