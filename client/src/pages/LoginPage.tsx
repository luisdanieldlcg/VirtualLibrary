import { Input, FormLabel, Button, Text, Flex, Box, Link, HStack } from "@chakra-ui/react";
import TitleContainer from "../components/TextContainer";
//import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Box maxWidth="700px" mx="auto" my="auto" mt={24}>
      <TitleContainer text="Iniciar sesión" />
      <FormLabel mt={10}>Email o nombre de usuario</FormLabel>
      <Input
        variant="primary"
        placeholder="Ingrese su correo o nombre de usuario"
      />
      <FormLabel mt={5}>Contraseña</FormLabel>
      <Input variant="primary" placeholder="Ingrese su contraseña" />
      <Flex>
        <Flex mt={5} alignItems="center">
            <Link href="/signup" display="flex">
              <Text>¿No tienes cuenta?</Text>
              <Text fontWeight="bold" ml="10px">Registrate</Text>
            </Link>
        </Flex>   
        <Button variant="primary" mt={7} px={7} py={3} ml="auto">Enviar</Button>
          {/* <Flex mt={5} justify="flex-end" ml="auto" alignItems="center" bg="red">
            <Link href="/signup" display="inline-block">
              <Text>¿No tienes cuenta?</Text>
              <Text fontWeight="bold" ml="10px">Registrate</Text>
            </Link>
          </Flex> */}
      </Flex>
    </Box>
  );
};

export default LoginPage;
