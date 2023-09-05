import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "username");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");

      // Press the submit button
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(
          {
            username: "username",
            password: "password",
          },
          expect.anything() // This will ensure that the second argument (the Formik methods and helpers) is there, but won't be strict about its content
        );
      });
    });
  });
});
