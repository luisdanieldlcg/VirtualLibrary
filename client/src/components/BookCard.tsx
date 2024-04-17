import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Book } from "../api";

interface Props {
  book: Book;
  compact?: boolean;
  onClick?: () => void;
}

export const MinimalBookCard = () => {
  return (
    <Card
      bg="surface"
      boxShadow="0 12px 28px 0px hsla(0, 0%, 0%, 0.17)"
      bgGradient="linear(to-b, surface, surfaceDarker)"
      borderRadius="xl"
      w="240px"
      maxH="220px"
      mx="8px"
    >
      <CardBody pt={0} mt={4}>
        <Image
          mt={0}
          src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
          objectFit="fill"
          w="100%"
          minH="130px"
          maxH="180px"
          borderRadius="xl"
        ></Image>
      </CardBody>
    </Card>
  );
};

const BookCard = ({ book, compact, onClick }: Props) => {
  return (
    <Tooltip
      label={compact ? book.genres.join(", ") : null}
      aria-label="A tooltip"
      hasArrow
      placement="top"
      bg="surfaceDarker"
    >
      <Card
        onClick={onClick}
        cursor={compact ? "pointer" : "default"}
        bg="surface"
        boxShadow="0 12px 28px 0px hsla(0, 0%, 0%, 0.17)"
        bgGradient="linear(to-b, surface, surfaceDarker)"
        borderRadius="xl"
        w={compact ? "280px" : "400px"}
        minH={compact ? "270px" : "590px"}
        maxH={compact ? "350px" : "1000px"}
        mx="8px"
      >
        {compact ? (
          <CardHeader textAlign="center">
            <Text>
              {book.title.length > 45
                ? book.title.substring(0, 45) + "..."
                : book.title}
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
        ) : null}
        <CardBody pt={0}>
          <Image
            mt={compact ? 0 : 8}
            src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
            objectFit="fill"
            w="100%"
            minH={compact ? "210px" : "590px"}
            maxH={compact ? "220px" : "1000px"}
            borderRadius="xl"
          ></Image>
        </CardBody>
      </Card>
    </Tooltip>
  );
};

export default BookCard;
