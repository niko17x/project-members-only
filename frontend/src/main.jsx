import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App.jsx";
import { HomeScreen } from "./screens/HomeScreen.jsx";
import { LoginScreen } from "./screens/LoginScreen.jsx";
import { RegisterScreen } from "./screens/RegisterScreen.jsx";
import { ProfileScreen } from "./screens/ProfileScreen.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { MessageScreen } from "./screens/MessageScreen.jsx";
import { MemberScreen } from "./screens/MemberScreen.jsx";
import { AdminScreen } from "./screens/AdminScreen.jsx";
import { SelectedProfileScreen } from "./screens/SelectedProfileScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      {/* Private Routes */}
      <Route path="/messages" element={<MessageScreen />} />
      <Route path="/member-status" element={<MemberScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path="/selected-profile/:id" element={<SelectedProfileScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
