import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import OrderModal from './components/OrderModal';
import CostCalculatorModal from './components/CostCalculatorModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import PricesPage from './pages/PricesPage';
import FleetPage from './pages/FleetPage';
import PortfolioPage from './pages/PortfolioPage';
import BusinessPage from './pages/BusinessPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const handleOpenOrderModal = (serviceName = '') => {
    setInitialService(serviceName);
    setOrderModalOpen(true);
  };

  const handleOpenCalculator = () => {
    setCalculatorModalOpen(true);
  };

  const handleApplyCalculation = (calcSummary) => {
    setInitialService(`Розрахунок з калькулятора: ${calcSummary}`);
    setOrderModalOpen(true);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Navbar
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenCalculator={handleOpenCalculator}
        />

        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenOrderModal={handleOpenOrderModal}
                  onOpenCalculator={handleOpenCalculator}
                />
              }
            />
            <Route
              path="/services"
              element={<ServicesPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            <Route
              path="/services/:serviceId"
              element={
                <ServiceDetail
                  onOpenOrderModal={handleOpenOrderModal}
                  onOpenCalculator={handleOpenCalculator}
                />
              }
            />
            <Route
              path="/prices"
              element={
                <PricesPage
                  onOpenOrderModal={handleOpenOrderModal}
                  onOpenCalculator={handleOpenCalculator}
                />
              }
            />
            <Route
              path="/fleet"
              element={<FleetPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            <Route
              path="/portfolio"
              element={<PortfolioPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            <Route
              path="/business"
              element={<BusinessPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            <Route
              path="/reviews"
              element={<ReviewsPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            <Route
              path="/contacts"
              element={<ContactsPage onOpenOrderModal={handleOpenOrderModal} />}
            />
          </Routes>
        </div>

        <Footer />

        {/* Persistent Bottom Sticky Bar for Mobile */}
        <StickyMobileBar onOpenOrderModal={() => handleOpenOrderModal()} />

        {/* Global Modals */}
        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          initialService={initialService}
        />

        <CostCalculatorModal
          isOpen={calculatorModalOpen}
          onClose={() => setCalculatorModalOpen(false)}
          onApplyCalculation={handleApplyCalculation}
        />
      </div>
    </Router>
  );
}
