import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Book } from "../api";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BookPage = () => {
  const location = useLocation();
  const { book } = location.state as { book: Book };
  return (
    <VStack align="flex-start">
      <IoArrowBackCircleOutline
        onClick={() => {
          window.history.back();
        }}
        cursor="pointer"
        color="gray.500"
        size="44px"
        style={{
          margin: 14,
        }}
      />
      <Flex>
        <Card
          bg="surface"
          w="400px"
          h="590px"
          borderRadius="xl"
          transition="transform 0.2s"
          cursor="pointer"
          boxShadow="0 12px 30px 0px hsla(0, 0%, 0%, 0.3)"
          bgGradient="linear(to-b, surface, surfaceDarker)"
          mx="64px"
          mb={4}
        >
          <CardBody>
            <Image
              mt={1}
              borderRadius="xl"
              src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
              objectFit="fill"
              w="100%"
              h="540px"
            />
          </CardBody>
        </Card>

        <VStack h="100%">
          <Heading
            bg="surface"
            borderRadius={20}
            px={7}
            py={3}
            display="inline-block"
            h="100%"
          >
            {book.title}
          </Heading>

          <Heading
            bg="surface"
            borderRadius={20}
            px={7}
            py={3}
            display="inline-block"
            h="100%"
          >
            {book.authorName}
          </Heading>

          <Box
            bg="surface"
            borderRadius={20}
            px={7}
            py={3}
            display="inline-block"
            h="100%"
          >
            {
              // TODO: figure out why this is not working
            }
            {/* {book.synopsis} */}
          </Box>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default BookPage;
