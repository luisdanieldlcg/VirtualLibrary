import { Avatar, Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box position="sticky" zIndex="100">
      <Flex
        as="nav"
        px="3vh"
        bg="surface"
        borderBottom="1px solid"
        borderColor="surfaceDarker"
        alignItems="center"
      >
        <Flex alignItems="center" justifyContent="center" ml="auto" mr="auto">
          {/* <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="lg"
          /> */}
          <Image
            src="/assets/images/logo-cyberbook.png"
            alt="Segun Adebayo"
            maxW="200px"
            maxH="200px"
          />
        </Flex>

        <Spacer />
        <Button colorScheme="teal" variant="primary" mr={6}>
          INICIO
        </Button>
        <Button colorScheme="teal" variant="primary" mr={6}>
          PERFIL
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
