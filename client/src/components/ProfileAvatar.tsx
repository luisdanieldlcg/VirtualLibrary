import { Avatar, Flex, Text } from "@chakra-ui/react";
import { User } from "../api";

interface Props {
  user?: User;
}
const ProfileAvatar = ({ user }: Props) => {
  return (
    <Flex align="center" p="2.6rem" borderColor="gray.200">
      <Avatar size="xl" src="https://bit.ly/dan-abramov" />
      <Flex flexDirection="column" justifyContent="center" ml={4}>
        <Text fontSize="xl" fontWeight="bold">
          luisscruz
        </Text>
        <Text fontSize="md">daniel@gmail.com</Text>
        <Text fontSize="sm">Miembro desde: 2021-09-01</Text>
      </Flex>
    </Flex>
  );
};
export default ProfileAvatar;
