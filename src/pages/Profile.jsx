import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {user,isAuthenticated,loading} = useContext(Context)

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <h1>Profile</h1>
      <h4>Name : {user?.name}</h4>
      <p>Email :{user?.email}</p>
      <p>Email :{user?.createdAt}</p>
    </div>
  )
}

export default Profile