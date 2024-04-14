import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import AvatarPicker from "../components/AvatarPicker";
import { Link, useNavigate } from "react-router-dom";
import { CYBERBOOK_API_URL, CYBERBOOK_SERVER_BASE_URL } from "../constants";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: undefined as File | undefined,
  });

  const toast = useToast({
    duration: 5000,
    isClosable: true,
    variant: "left-accent",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async () => {
    try {
      var formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("confirmPassword", form.confirmPassword);
      if (form.avatar) {
        formData.append("avatarImage", form.avatar);
      }

      setLoading(true);
      let response = await axios.post(
        `${CYBERBOOK_API_URL}/auth/signup`,
        formData
      );

      if (response.data.status === "success") {
        let data = response.data;
        auth.setUser(data.data);
        toast({
          title: "Cuenta creada",
          description: "Tu cuenta ha sido creada exitosamente.",
          status: "success",
        });

        setTimeout(() => {
          // TODO: fix user not being set in auth context
          // console.log("auth user", auth.user);
          navigate("/home");
        }, 300);
      }
    } catch (error: any) {
      toast({
        title: "Falló la creación de la cuenta",
        description:
          "Asegúrate de llenar todos los campos correctamente. Si el problema persiste, Contacta a soporte.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Center mt={24}>
        <SimpleGrid
          columns={{
            base: 1,
            lg: 2,
          }}
          spacing={24}
          px={6}
        >
          <Box
            w={{
              base: "100%",
              md: "500px",
              lg: "560px",
            }}
          >
            <Heading
              bg="surface"
              color="gray.800"
              borderRadius={20}
              p={7}
              py={3}
              display="inline-block"
            >
              Crea tu cuenta
            </Heading>
            <FormLabel mt={16}> Nombre completo </FormLabel>
            <Input
              placeholder="Ingrese su nombre completo"
              variant="primary"
              onChange={(e) => {
                setForm({ ...form, fullName: e.target.value });
              }}
            />
            <FormLabel mt={5}> Nombre de usuario </FormLabel>
            <Input
              placeholder="Ingrese su nombre de usuario"
              variant="primary"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            <FormLabel mt={5}> Correo electrónico </FormLabel>
            <Input
              type="email"
              placeholder="Ingrese su correo electrónico"
              variant="primary"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
            <FormLabel mt={5}> Contraseña </FormLabel>
            <Input
              type="password"
              placeholder="Ingrese su contraseña, mínimo 5 carácteres"
              variant="primary"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            <FormLabel mt={5}> Confirmar contraseña </FormLabel>
            <Input
              type="password"
              placeholder="Confirme su contraseña"
              variant="primary"
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
              }}
            />
            <Link to="/login">
              <Flex mt={7}>
                <Text>¿Ya tienes una cuenta? </Text>
                <Text
                  color="gray.800"
                  fontWeight="bold"
                  _hover={{
                    textDecoration: "underline",
                  }}
                  ml="12px"
                >
                  Inicia sesión
                </Text>
              </Flex>
            </Link>
          </Box>
          <VStack p={6}>
            <Spacer />
            <AvatarPicker
              initialImage={`${CYBERBOOK_SERVER_BASE_URL}/images/defaultAvatar.jpg`}
              onFileChanged={(file) => {
                setForm({ ...form, avatar: file });
              }}
            />
            <Spacer />
            <Button
              variant="primary"
              px={12}
              py={6}
              mt={24}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Envíar Solicitud
            </Button>
          </VStack>
        </SimpleGrid>
      </Center>
    </>
  );
};

export default SignupPage;
