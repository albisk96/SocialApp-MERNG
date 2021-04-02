import { useContext } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth";
import "./header.css";

const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar className="header" variant="dark">
      <Navbar.Brand href="#home">MySocialApp</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Profile</Nav.Link>
        <Nav.Link href="#features">Feed</Nav.Link>
        <Nav.Link href="#pricing">Friends</Nav.Link>
        <Nav.Link>Chat</Nav.Link>
      </Nav>
      <Form inline>
        <Button onClick={() => logout()} variant="outline-info">
          Logout
        </Button>
      </Form>
    </Navbar>
  );
};

export default Header;
