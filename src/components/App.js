import React from 'react';
import Dashboard from './Dashboard';
import GlobalFonts from '../GlobalFontProvider';
import ErrorBoundary from './ErrorBoundry';

export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <GlobalFonts />
        <Dashboard />
      </ErrorBoundary>
    </React.Fragment>
  );
}
