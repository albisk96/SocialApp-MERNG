import { Form } from "react-bootstrap";

export const Input = ({
  label,
  type,
  placeholder,
  value,
  name,
  handleChange,
}) => (
  <Form.Group controlId={`formBasic${name}`}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={handleChange}
      autoComplete="off"
    />
  </Form.Group>
);
