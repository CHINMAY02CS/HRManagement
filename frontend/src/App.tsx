import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <AdminDashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
