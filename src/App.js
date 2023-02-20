import Login from './Screens/Login';
import SignUp from './Screens/SingUp';
import Home from './Screens/Home';

import { RouterProvider,createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,    
  },
  {
    path: "/SignUp",
    element: <SignUp />,    
  },
  {
    path: "/",
    element: <Home />,    
  },
]);




function App() {
  return (
    <RouterProvider router={router}>
        

    </RouterProvider>
  );
}

export default App;
