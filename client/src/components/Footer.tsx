import { Flex } from '@chakra-ui/react'


const Footer = () => {
  return (
    <Flex
        as="footer"
        align="center"
        justify="center"
        bg="surface"
        color="onSurface"
        p={4}
        position="fixed"
        bottom="0"
        width="100%"
        mt={4}
        >
        © 2024 Cyberbook
    </Flex>
    
  )
}

export default Footer