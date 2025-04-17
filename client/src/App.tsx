import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import './utils/fixLeafletIcon';
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import Navbar from "./components/common/Navbar/Navbar";
import MessagesPage from "./pages/MessagesPage";
import Header from "./components/common/Header/Header";
import NotificationsPage from "./pages/NotificationsPage";
import RegisterChefPage from "./pages/RegisterChefPage";
import OrdersPage from "./pages/OrdersPage";
import ListingPage from "./pages/ListingPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import PaymentPage from "./components/features/SettingsPage/PaymentPage";
import SecurityPage from "./components/features/SettingsPage/SecurityPage";
import SettingsPage from "./components/features/SettingsPage/SettingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagePage from "./pages/MessagePage";
import PlanPage from "./pages/PlanPage";
import LocationPage from "./components/features/SettingsPage/LocationPage";

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

            <div className="flex-1  w-full">
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

                    <Route
                        path="/payments"
                        element={
                            <ProtectedRoute>
                                <PaymentsPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path="/profile-settings/*"
                        element={
                            <ProtectedRoute>
                                <ProfileSettingsPage />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="payments" element={<PaymentPage />} />
                        <Route path="security" element={<SecurityPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                        <Route path="location" element={<LocationPage />} />
                        <Route index element={<SettingsPage />} />
                    </Route>

                    <Route 
                        path="/messages" 
                        element={
                            <ProtectedRoute>
                                <MessagesPage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/messages/:messageId" 
                        element={
                            <ProtectedRoute>
                                <MessagePage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/plan" 
                        element={
                            <ProtectedRoute>
                                <PlanPage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route path='/listing/:listingId' element={<ListingPage /> } />
                    
                    <Route path="/map" element={<MapPage />} />

                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/register-chef" element={<RegisterChefPage />} />
                </Routes>
            </div>

            <Navbar />
        </div>
    );
}