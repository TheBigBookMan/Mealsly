import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import LoadingSpinner from "./components/common/ui/LoadingSpinner";
import OnboardUploadsPage from "./components/features/Onboarding/OnboardUploadsPage";
import OnboardPaymentsPage from "./components/features/Onboarding/OnboardPaymentsPage";
import OnboardHomePage from "./components/features/Onboarding/OnboardHomePage";
import OnboardAboutYouPage from "./components/features/Onboarding/OnboardAboutYouPage";
import OnboardTagsPage from "./components/features/Onboarding/OnboardTagsPage";
import OnboardUploadImagesPage from "./components/features/Onboarding/OnboardUploadImagesPage";
import OnboardAddressPage from "./components/features/Onboarding/OnboardAddressPage";
import { OnboardProvider } from "./contexts/onboardContext/OnboardProvider";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();

    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/" replace />;

    if(user.chef && user.chef.isOnboarded === false && location.pathname !== '/onboarding') {
        return <Navigate to='/onboarding' replace />
    }

    return <>{children}</>;
}

export default function App() {
    const location = useLocation();
    const {user} = useUser();
    const isOnboarding = location.pathname === "/onboarding";
    
    return (
        <div className='flex flex-col justify-between md:justify-normal min-h-screen w-screen text-slate-500 font-sans'>
            {!isOnboarding && <Header />}

            <div className="flex-1  w-full">
                <Routes>
                    <Route path="*" element={<Navigate to="/" replace />} />

                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                        } 
                    />

                    {user?.chef.isOnboarded === false && (
                        <Route
                            path="/onboarding/*"
                            element={
                                <ProtectedRoute>
                                    <OnboardProvider>
                                        <OnboardPage />
                                    </OnboardProvider>
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<OnboardHomePage />} />

                            <Route path="about-you" element={<OnboardAboutYouPage />} />

                            <Route path="uploads" element={<OnboardUploadsPage />} />

                            <Route path="tags" element={<OnboardTagsPage />} />

                            <Route path="address" element={<OnboardAddressPage />} />

                            <Route path="upload-images" element={<OnboardUploadImagesPage />} />

                            <Route path="payments" element={
                                <StripeWrapper>
                                    <OnboardPaymentsPage />
                                </StripeWrapper>
                            }/>
                        </Route>
                    )}

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

            {!isOnboarding && <Navbar />}
        </div>
    );
}