import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TicketProvider } from './context/ticket.context';
import Loading from './components/Loading/Loading';

const TicketList = lazy(() => import('./components/TicketList/ticket.list'));
const TicketDetails = lazy(() => import('./components/TicketDetail/ticket.detail'));

const App: React.FC = () => {
  return (
    <TicketProvider>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </TicketProvider>
  );
};

export default App;
