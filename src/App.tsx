
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path='' element={<MainPage/>}/>
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
  );
}

export default App;
