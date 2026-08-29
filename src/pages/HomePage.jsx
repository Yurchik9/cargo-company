import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import PricesSection from '../components/PricesSection';
import PortfolioSection from '../components/PortfolioSection';
import FleetSection from '../components/FleetSection';
import BusinessSection from '../components/BusinessSection';
import WhyUsSection from '../components/WhyUsSection';
import ReviewsSection from '../components/ReviewsSection';
import CtaBlock from '../components/CtaBlock';

export default function HomePage({ onOpenOrderModal, onOpenCalculator }) {
  return (
    <main className="space-y-0">
      <HeroSection onOpenOrderModal={onOpenOrderModal} onOpenCalculator={onOpenCalculator} />
      <ServicesGrid onOpenOrderModal={onOpenOrderModal} />
      <PricesSection onOpenCalculator={onOpenCalculator} onOpenOrderModal={onOpenOrderModal} />
      <PortfolioSection />
      <FleetSection onOpenOrderModal={onOpenOrderModal} />
      <BusinessSection onOpenOrderModal={onOpenOrderModal} />
      <WhyUsSection />
      <ReviewsSection />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
