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
import { NavLink } from "react-router-dom";


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
              <MenuItem icon={<FiHome />}>
                <NavLink style={{ color: 'white' }} to='/'>
                  Home
                </NavLink>
              </MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/userslist' className='link'>Lista De Usuarios</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/organization-list' className='link'>Lista De Organizaciones</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/detail-payment' className='link'>Detalles de compras</NavLink></MenuItem>
              <MenuItem icon={<FiEdit />}><NavLink to='/events-config' className='link'>Config. de Eventos</NavLink></MenuItem>
              <MenuItem icon={<FiEdit />}><NavLink to='/create-category' className='link'>Crear Categoria</NavLink></MenuItem>
              <MenuItem icon={<FiEdit />}><NavLink to='/create-organization' className='link'>Crear Organization</NavLink></MenuItem>
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
