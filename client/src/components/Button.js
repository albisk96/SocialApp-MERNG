import { Button } from "react-bootstrap";

export const MyButton = ({ loading, children, ...rest }) => (
  <Button {...rest} disabled={loading}>
    {children} &nbsp;
    {loading && (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    )}
  </Button>
);
