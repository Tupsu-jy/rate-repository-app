import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./TextComponents/FormikTextInput";
import { useSignIn } from "../hooks/useSignIn";
import useMyNavigator from "../hooks/useMyNavigator";
import { signInValidationSchema } from "../utils/validationSchemas";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 8,
  },
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={signInValidationSchema}
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
            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Sign in"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const { goToHome } = useMyNavigator();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      goToHome();
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
