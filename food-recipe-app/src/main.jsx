import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/home'
import Favorites from './pages/favorites'
import Details from './pages/details'
import GlobalState from './context/index.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/recipe-items/:id' element={<Details />} />
      <Route path='/favorites' element={<Favorites />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  </StrictMode>,
)
