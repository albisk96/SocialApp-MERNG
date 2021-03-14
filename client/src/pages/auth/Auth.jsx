import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Login from "../../components/Login";
import Register from "../../components//Register";
import "./auth-card.css";
import Particles from "react-tsparticles";
import { particlesMainBackground } from "../../Particles";

const AuthDialog = () => {
  const [key, setKey] = useState("login");

  return (
    <>
      <Particles params={particlesMainBackground} />
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
    </>
  );
};

export default AuthDialog;
