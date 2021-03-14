import { Navbar, Nav, Form, Button } from "react-bootstrap";

const Header = () => (
  <Navbar style={{ backgroundColor: "rgb(10 10 10)!important" }} variant="dark">
    <Navbar.Brand href="#home">MySocialApp</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Profile</Nav.Link>
      <Nav.Link href="#features">Feed</Nav.Link>
      <Nav.Link href="#pricing">Friends</Nav.Link>
      <Nav.Link>Chat</Nav.Link>
    </Nav>
    <Form inline>
      <Button variant="outline-info">Logout</Button>
    </Form>
  </Navbar>
);

export default Header;
