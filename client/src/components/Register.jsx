import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { REGISTER_USER } from "../graphql/mutations";
import { Input } from "./form/FormInput";
import { useForm } from "../utils/custom_hooks";
import { AuthContext } from "../context/auth";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const Register = () => {
  let history = useHistory();
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values, setErrors, errors } = useForm(
    registerUser,
    initialValues
  );

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/feed");
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
      <Form noValidate onSubmit={onSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="Enter email"
          value={values.email}
          name="email"
          onChange={onChange}
          error={errors.email}
          required
        />
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
        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          name="confirmPassword"
          onChange={onChange}
          error={errors.confirmPassword}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
