import "@fontsource/poppins/400.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {UserProvider} from './contexts/userContext/UserProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    </StrictMode>
)
