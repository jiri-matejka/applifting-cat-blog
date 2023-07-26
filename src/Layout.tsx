import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box } from '@chakra-ui/react';

export function Layout() {
  return (
    <>
      <Header />
      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
}
