import Navbar from "./Navbar";
import {Outlet} from "react-router"

/** The shared layout for all pages of the app */
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main><Outlet/></main>
    </>
  );
}

//I am replacing children with Outlet as children was the previous code. 
//Outlet here is like dropping the page here with NavBar above it
//I am imported from react router for the outlet component