import {
  Input,
  FormLabel,
  Button,
  Text,
  Flex,
  Box,
  Link,
  useToast,
  Image,
} from "@chakra-ui/react";
import TitleContainer from "../components/TextContainer";
import { useState } from "react";
import { login } from "../api";

const LoginPage = () => {
  const [input, setInput] = useState({
    emailOrUsername: "",
    password: "",
  });

  const toast = useToast({
    isClosable: true,
    variant: "left-accent",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    await login(
      input.emailOrUsername,
      input.password,
      (user) => {},
      (error) => {
        if (!error) {
          toast({
            title: "No se pudo iniciar sesión",
            description: "Debe completar todos los campos",
            status: "error",
          });
        } else {
          toast({
            title: "No se pudo iniciar sesión",
            description: error,
            status: "error",
          });
        }
      }
    );
    setLoading(false);
  };
  return (
    <Box maxWidth="700px" mx="auto" my="auto" mt={24}>
      <TitleContainer text="Iniciar sesión" />
      <Flex></Flex>
      <FormLabel mt={10}>Email o nombre de usuario</FormLabel>
      <Input
        onChange={(event) => {
          setInput({ ...input, emailOrUsername: event.target.value });
        }}
        variant="primary"
        placeholder="Ingrese su correo o nombre de usuario"
      />
      <FormLabel mt={5}>Contraseña</FormLabel>
      <Input
        onChange={(event) => {
          setInput({ ...input, password: event.target.value });
        }}
        variant="primary"
        placeholder="Ingrese su contraseña"
      />
      <Flex>
        <Flex mt={5} alignItems="center">
          <Link href="/signup" display="flex">
            <Text>¿No tienes cuenta?</Text>
            <Text fontWeight="bold" ml="10px">
              Registrate
            </Text>
          </Link>
        </Flex>
        <Button
          variant="primary"
          mt={7}
          px={7}
          py={3}
          ml="auto"
          onClick={onLogin}
          isLoading={loading}
        >
          Enviar
        </Button>
      </Flex>
    </Box>
  );
};

export default LoginPage;
