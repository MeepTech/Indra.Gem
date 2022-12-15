import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import StartPage from '../pages/start';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </Router>
  );
}
