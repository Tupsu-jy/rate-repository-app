import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 8,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username should be at least 4 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters long")
    .required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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

export default SignIn;
