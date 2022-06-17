import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut, FiEdit, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./side-bar.css";
import { Link } from "react-router-dom";


const SideBar = () => {
    const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <span>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              <p>{menuCollapse ? "Panel" : "Panel"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to='/'>
                  Home
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}><Link to='/userslist'>Lista De Usuarios</Link></MenuItem>
              <MenuItem icon={<FaList />}><Link to='/organization-list'>Lista De Organizaciones</Link></MenuItem>
              <MenuItem icon={<FaList />}><Link to='/detail-payment'>Detalles de compras</Link></MenuItem>
              <MenuItem icon={<FiEdit />}><Link to='/events-config'>Config. de Eventos</Link></MenuItem>
              <MenuItem icon={<FiEdit />}><Link to='/create-category'>Crear Categoria</Link></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </span>
  );
};

export default SideBar;
