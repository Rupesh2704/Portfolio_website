import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'    

// For debugging
console.log('Main.tsx is running');

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found');
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}