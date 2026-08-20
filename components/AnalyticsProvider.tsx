'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function AnalyticsProvider() {
  useEffect(() => {
    // Replace with your actual Clarity Project ID
    const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "";
    if (clarityProjectId) {
      Clarity.init(clarityProjectId);
    }
  }, []);

  return null;
}