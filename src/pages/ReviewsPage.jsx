import React, { useEffect } from 'react';
import ReviewsSection from '../components/ReviewsSection';
import CtaBlock from '../components/CtaBlock';

export default function ReviewsPage({ onOpenOrderModal }) {
  useEffect(() => {
    document.title = "Відгуки клієнтів про вантажників у Львові | НІКА";
  }, []);

  return (
    <main className="pt-6 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <ReviewsSection />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
