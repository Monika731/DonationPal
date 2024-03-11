import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'src/components/header/Header';
import Home from './pages/home/Home';
import CampaignDetail from './pages/CampaignDetail/CampaignDetail';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PageLayout from './pages/Pagelayout/PageLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path='/login' element={ <PageLayout /> }>
          <Route index element={ <LoginPage /> } />
          <Route path='/login/profile' element={ <ProfilePage /> } />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
