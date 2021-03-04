import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Login from "../../components/Login";
import Register from "../../components//Register";
import "./auth-card.css";

const AuthDialog = () => {
  const [key, setKey] = useState("login");

  return (
    <div className="auth-modal">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="login" title="Login">
          <Login />
        </Tab>
        <Tab eventKey="register" title="Register">
          <Register />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuthDialog;
