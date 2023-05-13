import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {user,isAuthenticated,loading} = useContext(Context)
  const userName = user?.name
  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }
  return (
   <>
     {loading ? <Loader /> : 
       <center style={{margin:20}}>
       <h1>{`Hi ${userName && userName.split(' ').slice(0,1)}`}</h1>
       <br />
       <h4>Name : {user?.name}</h4>
       <p>Email : {user?.email}</p>
       <p>Created At : {user?.createdAt}</p>
     </center>
     }
   </>
  )
}

export default Profile