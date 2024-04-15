import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div>
      <footer>
        <Box
          bg="primary"
          color="white"
          p={4}
          position="absolute"
          bottom="0"
          width="100%"
        >
          <Text>© 2024 Cyberbook</Text>
        </Box>
      </footer>
    </div>
  );
};

export default Footer;
