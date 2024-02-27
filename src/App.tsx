import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/carteira" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
