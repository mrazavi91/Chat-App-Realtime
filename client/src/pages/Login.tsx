import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomisedInput from '../components/shared/CustomisedInput'
import { IoMdLogIn } from "react-icons/io";
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing In!" , {id: "login"})
      await auth?.login(email, password)
      toast.success("Signed in successfully!" , {id: "login"})
      
    } catch (error) {
      toast.error("Signing in Failed!", { id: "login" })
      console.log(error)
    }
    
  }

  useEffect(() => {
  
    if (auth?.user) {
      return navigate('/chat')
    }
  },[auth])


  return (
    <Box width={'100%'} height={'100%'} display='flex' flex={1}>
      <Box
        padding={8}
        mt={8}
        display={{ md: 'flex', small:'none', xs:'none'}}
      >
        <img src="airobot.png" alt="Robot" style={{width:" 400px"}}/>
      </Box>
      <Box
        display='flex'
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form 
          onSubmit={submitHandler}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none"
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <Typography 
            variant='h4' 
            textAlign={'center'} 
            padding={2} 
              fontWeight={600}
            > Login</Typography>
            <CustomisedInput type='email' name="email" label='Email' />
            <CustomisedInput type='password' name="password" label='Password' />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoMdLogIn/>}
            >
              Login
            </Button>

          </Box>
        </form>

      </Box>

    </Box>
  )
}
