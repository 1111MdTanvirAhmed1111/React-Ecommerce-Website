import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { Button } from '../ui/button';
import { NavLink } from 'react-router-dom';

const LoginLinker = () => {
    const jwt = localStorage.getItem('jwt')
    jwt? <NavLink to="/profile"><IoPersonCircle /></NavLink> : <NavLink to="/auth"><Button >Login</Button></NavLink>
};

export default LoginLinker;