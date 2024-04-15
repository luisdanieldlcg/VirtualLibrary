import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Book, getAllBooks } from "../api";
import { motion } from "framer-motion";

type SearchFilter = "title" | "genre" | "category" | "reading-list";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("title");
  const [loading, setLoading] = useState(true);

  // Fetch all books from the API and populate the `books` state

  useEffect(() => {
    const fetchBooks = async () => {
      setTimeout(async () => {
        const availableBooks = await getAllBooks();
        setBooks(availableBooks || []);

        setLoading(false);
      }, 1500);
    };
    fetchBooks();
  }, []);

  // get a list of all unique gnres
  // const genres = books
  //   .map((book) => book.genres)
  //   .flat()
  //   .filter((genre, i, arr) => arr.indexOf(genre) === i);

  // console.log(genres);

  const search = books.filter((book) => {
    switch (filter) {
      case "title":
        return book.title.toLowerCase().includes(query.toLowerCase());
      case "genre":
        return book.genres.some((genre) =>
          genre.toLowerCase().includes(query.toLowerCase())
        );
      case "category":
        return book.categoryName.toLowerCase().includes(query.toLowerCase());
      case "reading-list":
        return false;
    }
  });

  const bookCards = search.map((book, i) => {
    return (
      <ScaleFade in={true} initialScale={0.1}>
        <motion.div whileHover={{ scale: 1.08 }}>
          <Tooltip
            // tooltip to put genres
            label={book.genres.join(", ")}
            fontSize="md"
            bg="surfaceDarker"
            color="white"
            placement="top"
            hasArrow
            boxShadow="0 0 20px 0 hsla(0, 0%, 0%, 0.3)"
          >
            <Card
              key={i}
              bg="surface"
              w="240px"
              transition="transform 0.2s"
              cursor="pointer"
              boxShadow="0 12px 30px 0px hsla(0, 0%, 0%, 0.3)"
              bgGradient="linear(to-b, surface, surfaceDarker)"
            >
              <CardHeader textAlign="center" fontWeight="bold">
                <Text fontSize="lg" fontWeight="600">
                  {book.title}
                </Text>
                <Tag
                  size="sm"
                  variant="solid"
                  bg="surfaceDarker"
                  borderRadius="full"
                  mt={2}
                >
                  {book.categoryName}
                </Tag>
              </CardHeader>
              <CardBody pb={5} pt={0}>
                <Image
                  borderRadius="xl"
                  src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                  objectFit="fill"
                  w="100%"
                  h="210px"
                />
              </CardBody>
            </Card>
          </Tooltip>
        </motion.div>
      </ScaleFade>
    );
  });

  return (
    <>
      <VStack
        alignItems="center"
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
            <Select
              bg="surface"
              borderColor="surfaceDarker"
              maxW={200}
              mr={4}
              onChange={(e) => {
                setFilter(e.target.value as SearchFilter);
              }}
            >
              <option value="title">Título</option>e
              <option value="genre">Género</option>
              <option value="category">Categoría</option>
              <option value="reading-list">Lista De Lectura </option>
            </Select>
            <Input
              bg="surface"
              borderColor="surfaceDarker"
              placeholder="Introduce el nombre de tu libro favorito"
              _placeholder={{ color: "#5e503f" }}
              onChange={(e) => {
                setQuery(e.target.value);
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
          py={12}
          mt={40}
          minH="100vh"
          bg="surface"
        >
          {bookCards.length > 0 ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 3,
                md: 4,
                xl: 5,
              }}
              spacingX={7}
              spacingY={20}
            >
              {bookCards}
            </SimpleGrid>
          ) : loading ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 3,
                md: 4,
                xl: 5,
              }}
              spacingX={7}
              spacingY={20}
            >
              {
                // create a skeleton for each book card
                // that resembles the size of the book card and its decorations
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                  <Box borderRadius="10px">
                    <Skeleton
                      startColor="surface"
                      endColor="surfaceDarker"
                      borderRadius="10px"
                      height="210px"
                      width="240px"
                    />
                    <SkeletonText
                      mt="4"
                      startColor="surface"
                      endColor="surfaceDarker"
                      noOfLines={2}
                    />
                    <SkeletonText
                      startColor="surface"
                      endColor="surfaceDarker"
                      mt="4"
                      noOfLines={1}
                    />
                  </Box>
                ))
              }
            </SimpleGrid>
          ) : (
            <motion.div
              animate={{ scale: [0.4, 1] }}
              transition={{ duration: 0.15 }}
            >
              <Text fontSize="xl" fontWeight="bold" mt="9vh">
                No se encontraron resultados :/
              </Text>
            </motion.div>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default HomePage;
