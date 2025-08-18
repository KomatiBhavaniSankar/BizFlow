import React, { useEffect } from "react";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanyLogo from "./components/CompanyLogo";
import PurposeSection from "./components/PurposeSection";
import FeaturesSection from "./components/FeaturesSection";
import ScheduleSection from "./components/ScheduleSection";
import MonitorSection from "./components/MonitorSection";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

// Pages
import Partner from "./pages/Partner";

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Clerk
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

// Analytics hooks and utils
import useScrollTracking from "./utils/useScrollTracking";
import useTimeTracking from "./utils/useTimeTracking";
import { trackPageView } from "./utils/analytics";

// 🔑 load publishable key from .env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in .env");
}

function AppRoutes() {
  // Initialize analytics tracking hooks
  useScrollTracking();
  useTimeTracking();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pageName =
      currentPath === "/"
        ? "Home"
        : currentPath.charAt(1).toUpperCase() + currentPath.slice(2);
    trackPageView(pageName);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth">
      {/* Background Gradient Blob */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <div className="overflow-hidden">
        {/* Navbar always visible */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Hero />
                </section>
                <section id="about">
                  <CompanyLogo />
                  <PurposeSection />
                  <FeaturesSection />
                </section>
                <section id="services">
                  <ScheduleSection />
                  <MonitorSection />
                  <PricingSection />
                  <ServicesSection />
                </section>
                <section id="testimonials">
                  <TestimonialsSection />
                </section>
                <section id="newsletter">
                  <NewsletterSection />
                </section>
              </>
            }
          />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 Protected route */}
          <Route
            path="/analytics"
            element={
              <>
                <SignedIn>
                  <AnalyticsDashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          {/* Clerk built-in pages */}
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer + ScrollToTop */}
        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        routerNavigate={useNavigate()}
      >
        <AppRoutes />
      </ClerkProvider>
    </Router>
  );
}

export default App;
