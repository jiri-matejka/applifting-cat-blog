import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box, Container } from '@chakra-ui/react';

export function Layout() {
  return (
    <>
      <Header />
      <Container px={10} maxW="4xl" py={10}>
        <Outlet />
      </Container>
    </>
  );
}
