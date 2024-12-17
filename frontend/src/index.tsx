import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Administration from './rootComponent/Administration';
import User from './rootComponent/User';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProductDetails from './rootComponent/ProductDetails';
import Login from './rootComponent/Login';
import ProtectedRoute from './rootComponent/protectedRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element= {
                          <ProtectedRoute roles = {["user"]}> 
                            <User/>
                          </ProtectedRoute>
                        }>
      </Route>
      <Route path='/admin' element={<ProtectedRoute roles = {["admin"]}>
        <Administration/>
        </ProtectedRoute>
      }></Route>
      <Route path='/product/:id' element={<ProtectedRoute roles = {["user"]}><ProductDetails/></ProtectedRoute>}></Route>
      <Route path='/login' element={<Login></Login>}> </Route>
      <Route path='/unauthorized' element={<div>Unauthorized page</div>}> </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
