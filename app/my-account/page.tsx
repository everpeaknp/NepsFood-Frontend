"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "@/components/Footer2";
import CopyrightFooter from "@/components/CopyrightFooter";
import MyOrders from "@/components/MyOrders";
import { Eye, EyeOff, User, Package, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MyAccountPage() {
    const router = useRouter();
    const { user, login, register, logout, isAuthenticated, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Dashboard state
    const [dashboardTab, setDashboardTab] = useState("orders");

    // Form states
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const [registerForm, setRegisterForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        try {
            const result = await login(loginForm.username, loginForm.password);
            if (result.success) {
                setSuccess("Login successful!");
                // User will see dashboard automatically
            } else {
                setError(result.error || "Login failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        try {
            const [firstName, ...lastNameParts] = registerForm.fullName.split(" ");
            const lastName = lastNameParts.join(" ");
            const username = registerForm.email.split("@")[0];

            const result = await register(
                username,
                registerForm.email,
                registerForm.password,
                firstName,
                lastName
            );

            if (result.success) {
                setSuccess("Registration successful!");
                // User will see dashboard automatically
            } else {
                setError(result.error || "Registration failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064C50] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is authenticated, show dashboard
    if (isAuthenticated && user) {
        return (
            <div className="min-h-screen bg-white">
                <Header />

                <main className="w-full py-8">
                    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center space-x-2 text-xs sm:text-sm">
                                <li>
                                    <a href="/" className="text-[#9CA3AF] hover:text-[#064C50]">Home</a>
                                </li>
                                <li className="text-[#9CA3AF]">/</li>
                                <li className="text-[#212529] font-medium">My Account</li>
                            </ol>
                        </nav>

                        {/* Welcome Message */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#212529] mb-2">
                                Welcome back, {user.first_name || user.username}!
                            </h1>
                            <p className="text-[#757575]">Manage your account and orders</p>
                        </div>

                        {/* Success/Error Messages */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                                {success}
                            </div>
                        )}

                        {/* Dashboard Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <nav className="space-y-2">
                                        <button
                                            onClick={() => setDashboardTab("orders")}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                                dashboardTab === "orders"
                                                    ? "bg-[#064C50] text-white"
                                                    : "text-[#212529] hover:bg-gray-50"
                                            }`}
                                        >
                                            <Package className="w-5 h-5" />
                                            <span>My Orders</span>
                                        </button>
                                        <button
                                            onClick={() => setDashboardTab("profile")}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                                dashboardTab === "profile"
                                                    ? "bg-[#064C50] text-white"
                                                    : "text-[#212529] hover:bg-gray-50"
                                            }`}
                                        >
                                            <User className="w-5 h-5" />
                                            <span>Profile</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-3">
                                {/* Orders Tab */}
                                {dashboardTab === "orders" && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <MyOrders />
                                    </div>
                                )}

                                {/* Profile Tab */}
                                {dashboardTab === "profile" && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h2 className="text-xl font-bold text-[#212529] mb-6">My Profile</h2>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.username}
                                                    disabled
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    disabled
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.first_name}
                                                    disabled
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.last_name}
                                                    disabled
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer1 />
                <Footer3 />
                <Footer2 />
                <CopyrightFooter />
            </div>
        );
    }

    // If user is not authenticated, show login/register forms
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="w-full py-4">
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center space-x-2 text-xs sm:text-sm">
                            <li>
                                <a href="/" className="text-[#9CA3AF] hover:text-[#064C50] transition-colors">
                                    Home
                                </a>
                            </li>
                            <li className="text-[#9CA3AF]">/</li>
                            <li className="text-[#212529] font-medium">My Account</li>
                        </ol>
                    </nav>

                    {/* Login/Register Container */}
                    <div className="max-w-sm sm:max-w-md mx-auto">
                        {/* Success/Error Messages */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                                {success}
                            </div>
                        )}

                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="flex bg-gray-50 rounded-lg p-1 w-full sm:w-auto">
                                <button
                                    onClick={() => {
                                        setActiveTab("login");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                        activeTab === "login"
                                            ? "bg-white text-[#064C50] shadow-sm"
                                            : "text-[#9CA3AF] hover:text-[#064C50]"
                                    }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab("register");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                        activeTab === "register"
                                            ? "bg-white text-[#064C50] shadow-sm"
                                            : "text-[#9CA3AF] hover:text-[#064C50]"
                                    }`}
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        {/* Login Form */}
                        {activeTab === "login" && (
                            <div className="bg-white">
                                <div className="text-center mb-4 sm:mb-6">
                                    <p className="text-[#757575] text-xs sm:text-sm px-2 sm:px-0">
                                        Sign in with your email address or username.
                                    </p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label htmlFor="login-email" className="block text-xs sm:text-sm font-medium text-[#212529] mb-2">
                                            Username or Email *
                                        </label>
                                        <input
                                            type="text"
                                            id="login-email"
                                            value={loginForm.username}
                                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent transition-colors text-sm sm:text-base disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="login-password" className="block text-xs sm:text-sm font-medium text-[#212529] mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="login-password"
                                                value={loginForm.password}
                                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                                required
                                                disabled={isSubmitting}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent transition-colors text-sm sm:text-base disabled:bg-gray-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 text-[#064C50] border-[#D1D5DB] rounded focus:ring-[#064C50] focus:ring-2 cursor-pointer"
                                            />
                                            <span className="ml-2 text-xs sm:text-sm text-[#212529] cursor-pointer">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#064C50] text-white py-2 sm:py-3 px-4 rounded-xl hover:bg-[#053d41] transition-colors font-medium text-sm sm:text-base cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Logging in..." : "Log in"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Register Form */}
                        {activeTab === "register" && (
                            <div className="bg-white">
                                <div className="text-center mb-4 sm:mb-6">
                                    <p className="text-[#757575] text-xs sm:text-sm px-2 sm:px-0">
                                        There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.
                                    </p>
                                </div>

                                <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label htmlFor="register-fullname" className="block text-xs sm:text-sm font-medium text-[#212529] mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="register-fullname"
                                            value={registerForm.fullName}
                                            onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent transition-colors text-sm sm:text-base disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="register-email" className="block text-xs sm:text-sm font-medium text-[#212529] mb-2">
                                            Email address *
                                        </label>
                                        <input
                                            type="email"
                                            id="register-email"
                                            value={registerForm.email}
                                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent transition-colors text-sm sm:text-base disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="register-password" className="block text-xs sm:text-sm font-medium text-[#212529] mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showRegPassword ? "text" : "password"}
                                                id="register-password"
                                                value={registerForm.password}
                                                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                                required
                                                disabled={isSubmitting}
                                                minLength={8}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064C50] focus:border-transparent transition-colors text-sm sm:text-base disabled:bg-gray-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowRegPassword(!showRegPassword)}
                                                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            >
                                                {showRegPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xs sm:text-sm text-[#212529] px-2 sm:px-0">
                                        <p>
                                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                                            <a href="#" className="text-[#064C50] hover:underline">
                                                privacy policy
                                            </a>
                                            .
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#064C50] text-white py-2 sm:py-3 px-4 rounded-xl hover:bg-[#053d41] transition-colors font-medium text-sm sm:text-base cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Registering..." : "Register"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer1 />
            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}
