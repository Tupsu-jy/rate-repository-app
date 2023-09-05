import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./TextComponents/FormikTextInput";
import { useSignIn } from "../hooks/useSignIn";
import { useCreateUser } from "../hooks/useCreateUser";
import useMyNavigator from "../hooks/useMyNavigator";
import { signUpValidationSchema } from "../utils/validationSchemas";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 8,
  },
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        onSubmit={onSubmit}
        validationSchema={signUpValidationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              style={styles.input}
              name="username"
              placeholder="Username"
            />
            <FormikTextInput
              style={styles.input}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <FormikTextInput
              style={styles.input}
              name="passwordConfirmation"
              placeholder="Confirm Password"
              secureTextEntry
            />
            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Sign Up"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const { goToHome } = useMyNavigator();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      goToHome();
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
