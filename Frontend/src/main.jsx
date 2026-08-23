import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import LenisProvider from './components/common/LenisProvider';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <App />
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
