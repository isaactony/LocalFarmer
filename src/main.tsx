import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './store/CartContext';
import { ProductsProvider } from './store/ProductsContext';
import { FarmsProvider } from './store/FarmsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FarmsProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </FarmsProvider>
  </StrictMode>
);