import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'src/components/header/Header';
import Home from './pages/home/Home';
import CampaignDetail from './pages/CampaignDetail/CampaignDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
