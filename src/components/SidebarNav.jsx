import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { LogoutIcon, MenuIcon, ProfileIcon, RequestsIcon } from "../assets/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../firebase";
import { useAuth } from "../authContext";

export default function SidebarNav(){
    const [collapsed, setCollapsed] = useState(false)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const {currentUser} = useAuth()

    const MenuItems = () => {
        if(currentUser){
            return(
                <>
                    <MenuItem className="sidebar-item" component={<Link to='/profile'/>}>
                        {collapsed ? <ProfileIcon/> : <div><ProfileIcon/><b>Profile</b></div>}
                    </MenuItem>
                    <SubMenu className="sidebar-submenu" label="Requests" 
                        icon={<RequestsIcon/>}
                        component={<Link to={'/requests'}/>} 
                    >
                        <MenuItem className="submenu-item">
                            Accepted
                        </MenuItem>
                        <MenuItem className="submenu-item">
                            Pending
                        </MenuItem>
                    </SubMenu>
                    <MenuItem  className="sidebar-item" onClick={logOut} > 
                        { collapsed ? <LogoutIcon/> : <div className="logout-button" ><LogoutIcon /><h3>Log Out</h3></div> }
                    </MenuItem>
                </>
            )
        } else {
            return (
                <MenuItem className="sidebar-item" component={<Link to='/login'/>}>
                    <div>{collapsed ? <ProfileIcon/> : <div><ProfileIcon/><b>Log In</b></div>}</div>
                </MenuItem>
            )
        }
    }

   
    return (
        <div className="sidebar">
            
            <Sidebar collapsed={collapsed} collapsedWidth="78px" width="179px">
                <Menu>
                    <MenuItem><button className="menu-button" onClick={() => setCollapsed(!collapsed)}><MenuIcon/></button></MenuItem>
                    <MenuItems />
                </Menu>
            </Sidebar> 
        </div>     
    )
}