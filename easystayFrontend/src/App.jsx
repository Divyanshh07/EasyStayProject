import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// PUBLIC PAGES
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import RecommandationSection from "./component/RecommendationSection";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import AllProperties from "./pages/AllProperties";

// CATEGORY PAGES
import PgPage from "./pages/PgPage";
import RentPage from "./pages/RentPage";
import BuyPage from "./pages/BuyPage";

// USER DASHBOARD
import Dashboard from "./pages/Dashboard";

// SELLER DASHBOARD
import SellerDashboardLayout from "./seller/SellerDashboardLayout";
import SellerDashboard from "./seller/SellerDashboard";
import AddProperty from "./seller/AddProperty";
import ManageProperties from "./seller/ManageProperties";
import SellerProfile from "./seller/SellerProfile";

// ADMIN DASHBOARD
import AdminDashboard from "./admin/AdminDashboard";
import DashboardHome from "./admin/DashboardHome";
import Properties from "./admin/Properties";
import RecentUsers from "./admin/RecentUsers";
import Sellers from "./admin/Sellers";
import Reports from "./admin/Reports";
import Settings from "./admin/Settings";
import AdminProfile from "./admin/AdminProfile";
import SellerEditProfile from "./seller/SellerEditProfile.jsx";
import AdminMessages from "./admin/AdminMessages.jsx";

function App() {
    const location = useLocation();

    // HIDE NAVBAR + FOOTER for dashboard pages
    const hideLayout =
        location.pathname.startsWith("/user-dashboard") ||
        location.pathname.startsWith("/admin-dashboard") ||
        location.pathname.startsWith("/seller-dashboard");

    return (
        <div className="flex flex-col min-h-screen">

            {!hideLayout && <Navbar />}

            <main className="flex-1">
                <Routes>

                    {/* PUBLIC ROUTES */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* PROPERTY ROUTES */}
                    <Route path="/properties" element={<PropertyList />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/recommandation" element={<RecommandationSection />} />
                    <Route path="/allProperties" element={<AllProperties />} />

                    {/* CATEGORY PAGES */}
                    <Route path="/buy" element={<BuyPage />} />
                    <Route path="/rent" element={<RentPage />} />
                    <Route path="/pg" element={<PgPage />} />

                    {/* USER DASHBOARD */}
                    <Route path="/user-dashboard" element={<Dashboard />} />

                    {/* SELLER DASHBOARD */}
                    <Route path="/seller-dashboard" element={<SellerDashboardLayout />}>
                        <Route index element={<SellerDashboard />} />
                        <Route path="add-property" element={<AddProperty />} />
                        <Route path="manage-properties" element={<ManageProperties />} />
                        <Route path="profile" element={<SellerProfile />} />
                        <Route path="editprofile" element={<SellerEditProfile />} />

                    </Route>

                    {/* ADMIN DASHBOARD */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="properties" element={<Properties />} />
                        <Route path="users" element={<RecentUsers />} />
                        <Route path="sellers" element={<Sellers />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="profile" element={<AdminProfile />} />   {/* fixed */}
                        <Route path="messages" element={<AdminMessages />} />

                    </Route>

                </Routes>
            </main>

            {!hideLayout && <Footer />}
        </div>
    );
}

export default App;
