'use client'

import React, { useEffect } from 'react'
import  Sidebar  from './Sidebar'

import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@/Contexts/UserContext';

export function AdminPanel() {
  const navigate = useNavigate()
const{User,setUser} = useUser()

useEffect(()=>{
  if(!User.admin){
    navigate('/')
      }
},[])


  return (
    <div className="flex h-screen bg-background">

      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

