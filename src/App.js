import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/users' element={<Users />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/edit-user/:id' element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
