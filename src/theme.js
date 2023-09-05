import { Platform } from "react-native";

const theme = {
  colors: {
    textWhite: "#FFFFFF",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textDefault: "#A9A9A9",
    primary: "#0366d6",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#D3D3D3",
    backgroundTertiary: "#24292e",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
