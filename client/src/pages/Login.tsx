import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomisedInput from '../components/shared/CustomisedInput'
import { IoMdLogIn } from "react-icons/io";


export default function Login() {

  const submitHandler =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(email, password)
  }


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
