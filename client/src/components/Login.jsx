import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Input } from "./FormInput";
import { useForm } from "../utils/custom_hooks";
import { AuthContext } from "../context/auth";

const initialValues = {
  username: "",
  password: "",
};

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialValues
  );

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="mt-4">
      <Form onSubmit={onSubmit}>
        <Input
          label="Username"
          type="text"
          placeholder="Username..."
          value={values.username}
          name="username"
          handleChange={onChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={values.password}
          name="password"
          handleChange={onChange}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
