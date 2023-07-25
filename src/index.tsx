import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const appDiv = document.getElementById('app');
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(<h1>Hello, world</h1>);
} else {
  throw new Error('app element not found');
}
