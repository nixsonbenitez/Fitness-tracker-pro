import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./auth/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthProvider>,
);


//Here BrowserRouter will be coming from our library react-router. 
// We surrounded our app with BrowserRouter as it will attribi=ute to where our url is at when we change pages.