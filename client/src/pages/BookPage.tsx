import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Book } from "../api";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { TextContainer } from "../components/TextContainer";
import BookCard from "../components/BookCard";

const BookPage = () => {
  const location = useLocation();
  const { book } = location.state as { book: Book };
  return (
    <VStack align="flex-start" minH="90vh">
      <IoArrowBackCircleOutline
        style={{ margin: 16 }}
        onClick={() => window.history.back()}
        cursor="pointer"
        size="44px"
      />
      <Flex>
        <Box ml="64px">
          <BookCard book={book} />
        </Box>

        <VStack h="100%" align="flex-start" spacing={2} ml="5rem" mt={10}>
          <TextContainer>
            <strong>Título: </strong>
            {book.title}
          </TextContainer>

          <TextContainer>
            <strong>Autor: </strong>
            {book.authorName}
          </TextContainer>

          <TextContainer>
            <strong>Año de publicación: </strong>
            {book.publicationYear}
          </TextContainer>

          <TextContainer>
            <strong>Categoría: </strong>
            {book.categoryName}
          </TextContainer>

          <TextContainer>
            <strong>Género(s):</strong>
            {book.genres.join(", ")}
          </TextContainer>

          <TextContainer>
            <strong>Sinopsis: </strong>
            {book.synopsis}
          </TextContainer>
          <Button variant="primary" size="lg" mt="64px" mb={10}>
            Añadir a la biblioteca
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default BookPage;
