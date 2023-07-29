import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Root } from './routing/Root';

document.body.innerHTML = '<div id="app"></div>';

const router = createBrowserRouter(createRoutesFromElements(Root));

const appDiv = document.getElementById('app');
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(
    <StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StrictMode>,
  );
} else {
  throw new Error('app element not found');
}
