import React from 'react'
import {Outlet} from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import Footer from "../../components/Footer"
const AdminMenu = () => {
    return (
        <>
            <AdminNavbar />
            <Outlet></Outlet>
            <Footer/>
        </>
    )
}

export default AdminMenu;