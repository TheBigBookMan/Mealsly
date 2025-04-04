import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ListingsPage from "./pages/ListingsPage";
import MapPage from "./pages/MapPage";
import Navbar from "./components/common/Navbar/Navbar";
import MessagesPage from "./pages/MessagesPage";
import Header from "./components/common/Header/Header";
import NotificationsPage from "./pages/NotificationsPage";
import RegisterChefPage from "./pages/RegisterChefPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();

    //   if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <>{children}</>;
}

export default function App() {
    return (
        <div className='flex flex-col justify-between md:justify-normal min-h-screen w-screen text-slate-500 font-sans'>
            <Header />

            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                    />

                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/register-chef" element={<RegisterChefPage />} />
            </Routes>

            <Navbar />
        </div>
    );
}