import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ListingsPage from "./pages/ListingsPage";
import MapPage from "./pages/MapPage";
import Navbar from "./components/common/Navbar/Navbar";
import MessagesPage from "./pages/MessagesPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    console.log(user);

    //   if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <>{children}</>;
}

export default function App() {
    return (
        <div className='flex flex-col justify-between min-h-screen w-screen text-slate-700 font-sans'>

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
            </Routes>

            <Navbar />
        </div>
    );
}