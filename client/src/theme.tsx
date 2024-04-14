import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const backgroundColor = "#FFF2E1";
const inputColor = "#EAD8C0";
const inputFocusColor = "#d9c7ae";

export default extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    surface: "#d1bb9e",
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "#d1bb9e",
          color: "gray.800",
          _hover: { bg: "#a79277" },
          fontSize: "lg",
          borderRadius: "20px",
        },
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            bg: inputColor,
            _hover: { bg: inputFocusColor, borderColor: inputFocusColor },
            border: "2px solid",
            borderColor: inputColor,
            _focus: {
              bg: inputFocusColor,
              borderColor: "#a79277",
            },
            _placeholder: { color: "#5e503f" },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        background: backgroundColor,
      },
    },
  },
});
