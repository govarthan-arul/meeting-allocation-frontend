import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NewForm from './project/form';
import Header from './project/header';
import Menu from './project/menu'
import Project from './project/project';
import Room from './project/room';
function App() {
  return (
    <Router>
    <Header />
    <Routes>
        
        <Route  path='/' element={ <Menu />} />
        <Route path='/form' element={<NewForm />} />
        <Route path='/room' element={<Room />} />
    </Routes>
    </Router>
    
      
     
      
   
  );
}

export default App;
