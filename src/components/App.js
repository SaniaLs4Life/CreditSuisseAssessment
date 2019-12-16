import React from 'react';
import Dashboard from './Dashboard';
import GlobalFonts from '../GlobalFontProvider';

export default function App() {
  return (
    <React.Fragment>
      <GlobalFonts />
      <Dashboard />
    </React.Fragment>
  );
}
