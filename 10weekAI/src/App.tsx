import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Curriculum } from './pages/Curriculum';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/curriculum" element={<Curriculum />} />
      </Routes>
    </Layout>
  );
}

export default App;
