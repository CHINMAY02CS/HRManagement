import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <h1>Hi</h1> }]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
