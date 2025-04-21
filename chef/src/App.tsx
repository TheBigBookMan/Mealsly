import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/userContext/useUser";
import './utils/fixLeafletIcon';
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/common/Navbar/Navbar";
import MessagesPage from "./pages/MessagesPage";
import Header from "./components/common/Header/Header";
import NotificationsPage from "./pages/NotificationsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagePage from "./pages/MessagePage";
import StripeWrapper from "./components/common/ui/StripeWrapper";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/ProfileSettingsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import InsightsPage from "./pages/InsightsPage";
import EarningsPage from "./pages/EarningsPage";
import MenuPage from "./pages/MenuPage";
import OnboardPage from "./pages/OnboardPage";

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
                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/onboard"
                        element={
                            <ProtectedRoute>
                                <OnboardPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/calendar"
                        element={
                            <ProtectedRoute>
                                <CalendarPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path="/settings/*"
                        element={
                            <ProtectedRoute>
                                <ProfileSettingsPage />
                            </ProtectedRoute>
                        }
                    >
                        {/* <Route path="payments" element={
                            <StripeWrapper>
                                <PaymentPage />
                            </StripeWrapper>
                        }/>
                        
                        <Route path="security" element={<SecurityPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                        <Route path="location" element={<LocationPage />} /> */}

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
                        path="/insights" 
                        element={
                            <ProtectedRoute>
                                <InsightsPage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/earnings" 
                        element={
                            <ProtectedRoute>
                                <EarningsPage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/menu" 
                        element={
                            <ProtectedRoute>
                                <MenuPage />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                        path="/notifications" 
                        element={
                            <ProtectedRoute>
                                <NotificationsPage />
                            </ProtectedRoute>
                        } 
                    />

                </Routes>
            </div>

            <Navbar />
        </div>
    );
}