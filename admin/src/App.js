import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Doctors from './pages/admin/Doctors';
import Users from './pages/admin/Users';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin/doctors' element={<Doctors />} />
          <Route path='/admin/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
