import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//Components
import Header from './components/header';
import Homepage from './pages/main/homepage';
import Extension from './pages/extension';
import PageNotFound from './components/error/404Error';

import { QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<Homepage  />} />
            <Route path='/homepage' element={<Homepage />} />
            <Route path='/ext' element={<Extension/>} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
    </QueryClientProvider>
  );
}

export default App;
