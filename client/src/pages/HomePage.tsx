import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Book, getAllBooks } from "../api";

const HomePage = () => {
  const bookData = Array(70).fill({
    title: "Book 1",
    coverImage:
      "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
  });

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const availableBooks = await getAllBooks();
      setBooks(availableBooks || []);

      console.log(availableBooks);
    };
    fetchBooks();
  }, []);

  const booksMockedData = bookData.map((book, i) => {
    return (
      <Card
        key={i}
        bg="surface"
        w="210px"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.08)",
          cursor: "pointer",
        }}
        boxShadow="0 0 30px 0 hsla(0, 0%, 0%, 0.3)"
        bgGradient="linear(to-b, surface, surfaceDarker)"
      >
        <CardBody>
          <Center>
            <Image src={book.coverImage} objectFit="fill" w="100%" h="210px" />
          </Center>
        </CardBody>
      </Card>
    );
  });

  return (
    <>
      <VStack
        alignItems="center"
        height="100vh"
        width="100vw"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundImage: "url('assets/images/test.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1, // Ensure this stays behind other content
            opacity: 1.0,
            filter: "brightness(0.3) grayscale(0.3)",
          }}
        />
        <Container maxW="800px" size="lg" py={5}>
          <InputGroup mt="20vh">
            <Select bg="surface" borderColor="surfaceDarker" maxW={200} mr={4}>
              <option value="title">Título</option>e
              <option value="genre">Género</option>
              <option value="category">Categoría</option>
              <option value="usuario">Lista De Lectura </option>
            </Select>
            <Input
              bg="surface"
              borderColor="surfaceDarker"
              placeholder="Introduce el nombre de tu libro favorito"
              _placeholder={{ color: "#5e503f" }}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <InputRightElement pointerEvents="none" children={<FaSearch />} />
          </InputGroup>
        </Container>
        <Box
          w="100%"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          py={6}
          mt={40}
          bg="surface"
        >
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 4,
              lg: 5,
            }}
            spacingX={7}
            spacingY={20}
          >
            {booksMockedData}
          </SimpleGrid>
        </Box>
      </VStack>
    </>
  );
};

export default HomePage;
