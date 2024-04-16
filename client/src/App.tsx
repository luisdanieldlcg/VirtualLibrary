import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./hooks/useAuth";
import HomeLayout from "./layouts/HomeLayout";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<HomeLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/book/:id" element={<BookPage />} />{" "}
        {
          // add book/:id route here
        }
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  )
);

export default App;
