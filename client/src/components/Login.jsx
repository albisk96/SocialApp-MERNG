import { useContext } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Input } from "./form/FormInput";
import { useForm } from "../utils/custom_hooks";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import { MyButton } from "./Button";

const initialValues = {
  username: "",
  password: "",
};

const Login = (props) => {
  let history = useHistory();
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values, setErrors, errors } = useForm(
    loginUserCallback,
    initialValues
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/feed");
    },
    onError(err) {
      let error = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(error);
      if (error.general) {
        setErrors({ ...errors, username: "Invalid credentials" });
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="mt-4">
      <Form
        noValidate
        validated={Object.keys(errors).length}
        onSubmit={onSubmit}
      >
        <Input
          label="Username"
          type="text"
          placeholder="Username..."
          value={values.username}
          name="username"
          onChange={onChange}
          error={errors.username}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={values.password}
          name="password"
          onChange={onChange}
          error={errors.password}
          required
        />
        <MyButton variant="primary" type="submit" loading={loading}>
          Submit
        </MyButton>
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
