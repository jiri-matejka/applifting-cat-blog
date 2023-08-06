import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Container,
  Link,
} from '@chakra-ui/react';
import { useAuthentication } from './hooks/useAuthentication';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  getLoginRoute,
  getMyArticlesRoute,
  getRecentArticlesRoute,
} from './routing/routes';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAvatarImage } from './hooks/useAvatarImage';

type Props = {
  href: string;
  children: React.ReactNode;
};

const Links = [{ text: 'Recent articles', link: getRecentArticlesRoute() }];
const BackofficeLinks = [{ text: 'My articles', link: getMyArticlesRoute() }];

function NavLink({ children, href }: Props) {
  return (
    <Box
      as={ReactRouterLink}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={href}
    >
      {children}
    </Box>
  );
}

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useAuthentication();
  const avatarSrc = useAvatarImage();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')}>
        <Container px={10} maxW="4xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <HStack spacing={8} alignItems="center">
              <Box>
                <Image src="/cat.png" height={10} width={10} alt="Logo" />
              </Box>
              <HStack
                as="nav"
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink href={link.link} key={link.text}>
                    {link.text}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems="center">
              {isAuthenticated ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Flex alignItems="center">
                      <ChevronDownIcon />
                      <Avatar size="sm" src={avatarSrc} />
                    </Flex>
                  </MenuButton>

                  <MenuList>
                    {BackofficeLinks.map((link) => (
                      <MenuItem
                        key={link.text}
                        as={ReactRouterLink}
                        to={link.link}
                      >
                        {link.text}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link as={ReactRouterLink} to={getLoginRoute()}>
                  Login
                </Link>
              )}
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as="nav" spacing={4}>
                {/* {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))} */}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
