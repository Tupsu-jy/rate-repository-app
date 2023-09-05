import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "../TextComponents/FormikTextInput";
import reviewValidationSchema from "./reviewValidationSchema";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          ownerUsername: "",
          repositoryName: "",
          rating: "",
          review: "",
        }}
        onSubmit={onSubmit}
        validationSchema={reviewValidationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              style={styles.input}
              name="ownerUsername"
              placeholder="Repository owner's GitHub username"
            />
            <FormikTextInput
              style={styles.input}
              name="repositoryName"
              placeholder="Repository's name"
            />
            <FormikTextInput
              style={styles.input}
              name="rating"
              placeholder="Rating (0-100)"
              keyboardType="numeric"
            />
            <FormikTextInput
              style={styles.input}
              name="review"
              placeholder="Review"
              multiline
            />
            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Submit Review"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ReviewFormContainer;
