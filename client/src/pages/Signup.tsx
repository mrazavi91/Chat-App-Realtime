import { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomisedInput from '../components/shared/CustomisedInput'
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const auth = useAuth()
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing up..." , {id: "signup"})
      await auth?.signup(name, email, password)
      toast.success("Signed up successfully!" , {id: "signup"})
    } catch (error) {
      toast.error("Signing up Failed!", { id: "signup" })
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
            > Sign Up</Typography>
            <CustomisedInput type='text' name="name" label='Name' />
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
              Sign up
            </Button>

          </Box>
        </form>

      </Box>

    </Box>
  )
}
