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
  confirmPassword: "",
  email: "",
};

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, initialValues);

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="mt-4">
      <Form onSubmit={onSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="Enter email"
          value={values.email}
          name="email"
          handleChange={onChange}
        />

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

        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          name="confirmPassword"
          handleChange={onChange}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
