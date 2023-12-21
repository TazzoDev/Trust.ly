import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import SidebarNav from "../SidebarNav";

export default function Layout(){
    return(
        <div className="layout-container">    
           
            <NavBar />  
                 
            <main>
                <SidebarNav />
                <Outlet />
            </main>
            <Footer />   
        </div>
    )
}