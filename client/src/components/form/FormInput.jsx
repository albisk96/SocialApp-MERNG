import { Form } from "react-bootstrap";
import "./form.css";

export const Input = ({ label, name, error, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} autoComplete="off" name={name} />
      {error && <p className="error-text">{error}</p>}
    </Form.Group>
  );
};
