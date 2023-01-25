import logo from './logo.svg';
import './App.css';

import Home   from './pages/home';
import Search from './pages/search';
import Error  from './pages/error';

import {
  createBrowserRouter,
  RouterProvider
}             from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home />,
      errorElement:<Error />
    },
    {
      path:"/search",
      element:<Search />,
      errorElement:<Error />
    }
  ]);

  return (
    <div>
      <h1 className={"title"}>Snapshot</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
