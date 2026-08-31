import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import OrderModal from './components/OrderModal';
import CostCalculatorModal from './components/CostCalculatorModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ServicesPricesPage from './pages/ServicesPricesPage';
import ServiceDetail from './pages/ServiceDetail';
import FleetPage from './pages/FleetPage';
import PortfolioPage from './pages/PortfolioPage';
import BusinessPage from './pages/BusinessPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [initialService, setInitialService] = useState('');
  const [contextState, setContextState] = useState(null);

  const handleOpenOrderModal = (serviceParam = '', customContext = null) => {
    // Check if serviceParam is a React SyntheticEvent object
    const isSyntheticEvent = serviceParam && typeof serviceParam === 'object' && (serviceParam.nativeEvent || serviceParam._reactName || serviceParam.target);

    if (typeof serviceParam === 'object' && serviceParam !== null && !isSyntheticEvent) {
      setInitialService(serviceParam.service || 'Вантажники Львів');
      setContextState({
        service: serviceParam.service || 'Вантажники Львів',
        transport: serviceParam.transport || 'Без автомобіля (тільки вантажники)',
        description: serviceParam.summary || serviceParam.description || ''
      });
    } else {
      const cleanService = typeof serviceParam === 'string' ? serviceParam : '';
      setInitialService(cleanService);
      setContextState(customContext);
    }
    setOrderModalOpen(true);
  };

  const handleOpenCalculator = () => {
    setCalculatorModalOpen(true);
  };

  const handleApplyCalculation = (calcData) => {
    handleOpenOrderModal(calcData);
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
            {/* Single Unified Services & Pricing Route */}
            <Route
              path="/services"
              element={<ServicesPricesPage onOpenOrderModal={handleOpenOrderModal} />}
            />
            {/* Redirect /prices directly to /services */}
            <Route
              path="/prices"
              element={<Navigate to="/services" replace />}
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
          initialContextState={contextState}
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
