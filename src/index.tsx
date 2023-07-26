import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ChakraProvider } from '@chakra-ui/react';

document.body.innerHTML = '<div id="app"></div>';

const appDiv = document.getElementById('app');
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  throw new Error('app element not found');
}
