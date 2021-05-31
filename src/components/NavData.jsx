import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FaVideo } from 'react-icons/fa'
import { FaDatabase } from 'react-icons/fa'
import { FaPowerOff } from 'react-icons/fa'
import { FaRegChartBar } from 'react-icons/fa'
import { IoOptionsOutline } from "react-icons/io5";

export const NavData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <FaHome />,
        cName: 'home'
    },
    {
        title: 'Camera',
        path: '/camera/',
        icon: <FaVideo />,
        cName: 'camera'
    },
    {
        title: 'Database',
        path: '/database/',
        icon: <FaDatabase />,
        cName: 'database'
    },
    {
        title: 'Sign Out',
        path: '/logout/',
        icon: <FaPowerOff />,
        cName: 'signout'
    }
]

