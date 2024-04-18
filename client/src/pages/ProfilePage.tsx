import {
  Box,
  Button,
  Flex,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileAvatar from "../components/ProfileAvatar";
import BookCard, { MinimalBookCard } from "../components/BookCard";
import { useLocation } from "react-router-dom";
import { Book } from "../api";
import { BiPlusCircle } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const location = useLocation();
  const { books } = location.state as { books: Book[] };
  const { user } = useAuth();
  let book = books[0];
  return (
    <VStack align="stretch" spacing={0}>
      <Flex borderBottom="1px solid" borderColor="surfaceDarker">
        <Box bg="surfaceLighter" display="inline-block" px="4rem">
          <ProfileAvatar user={user!} />
          <Flex p="6">
            <Button variant="primary" mr="3">
              Editar Perfil
            </Button>
            <Button variant="primary">Cerrar Sesión</Button>
          </Flex>
        </Box>
        <Box py="14px" mx="3rem">
          <Text
            fontSize="24px"
            fontWeight="bold"
            color="text"
            textAlign="center"
            mb={4}
          >
            Progreso de lectura
          </Text>
          <BookCard book={books[0]} compact />
          <Flex mt="16px">
            <Text fontSize="sm" ml="3">
              50%
            </Text>
            <Progress
              value={50}
              size="xs"
              w="65%"
              ml={3}
              mt={2}
              variant="primary"
            />
          </Flex>
        </Box>

        <Box py="20px">
          <VStack h="100%" align="flex-start" mt="3rem">
            <Box onClick={() => {}}>
              <Text fontSize="lg" mb="8px">
                <strong>Título:</strong> {book.title}
              </Text>
              <Text fontSize="lg" mb="8px">
                <strong>Autor:</strong> {book.authorName}
              </Text>
              <Text fontSize="lg" mb="8px">
                <strong>Fecha de publicación: </strong>
                {book.publicationYear}
              </Text>
              <Text
                fontSize="lg"
                mb="8px"
                whiteSpace="pre-wrap"
                overflowWrap="break-word"
                maxW="700px"
              >
                <strong>Descripción:</strong> {book.synopsis}
              </Text>
            </Box>
            <Button variant="primary" bg="surface" mt="6rem">
              Siguiente
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Box bg="surface" boxShadow="md" py={6}>
        <Tabs variant="primary" align="center">
          <TabList mb={5}>
            <Tab> Mis libros</Tab>
            <Tab> Mis Lista de lectura</Tab>
          </TabList>

          <TabPanels
            bg="background"
            borderTop="1px solid"
            borderColor="surfaceDarker"
          >
            <TabPanel>
              <Flex>
                {books.map((book) => (
                  <Flex key={book.idBook} p="20px">
                    <MinimalBookCard />
                  </Flex>
                ))}
              </Flex>
            </TabPanel>
            <TabPanel pb={16}>
              <Flex mt={4}>
                <Box
                  mx="auto"
                  bg="surface"
                  fontWeight="400"
                  borderRadius={20}
                  px={7}
                  py={3}
                  display="inline-block"
                  onClick={() => {}}
                >
                  <Text> Nombre lista de lectura de prueba </Text>
                </Box>

                <Button
                  variant="primary"
                  mx="auto"
                  fontWeight="400"
                  onClick={() => {}}
                >
                  <Text mr="3">Crear nueva lista</Text>
                  <BiPlusCircle size="20px" />
                </Button>
              </Flex>
              <Text fontSize="sm" mt={16}>
                Aún no has creado ninguna lista de lectura ;/
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
};

export default ProfilePage;
