import { Avatar, Box, Typography, Button, IconButton } from '@mui/material'
import {red} from '@mui/material/colors'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem'
import { IoMdSend } from 'react-icons/io'
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type Message = {
  role: "user" | "assistant";
  content: string;
}



export default function Chat() {
  const auth = useAuth()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const navigate = useNavigate()


  const submitHandler = async () => {
    const content = inputRef.current?.value as string
    if (inputRef && inputRef.current) {
      inputRef.current.value = ""
    }
    const newMessage: Message = { role: "user", content }
    setChatMessages((prev) => [...prev, newMessage])
    const chatData = await sendChatRequest(content)
    setChatMessages([...chatData.chats])
  }

  //fetching the chats before laodig the page
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats...", { id: "loadchats" })
      getUserChats().then((data) => {
        setChatMessages([...data.chats])
        toast.success("Successfully loaded chats!", { id: "loadchats" })
      }).catch((err) => {
        console.log(err)
        toast.error("Loading Failed",  { id: "loadchats" })
      })
    }
  }, [auth])
  
  //redirecting to home page if you are nnot signed in
  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login')
    }
  },[auth])



  // delete Convo 
  const deleteHandler = async () => {
    try {
      toast.loading("Deleting Chats...", { id: "loadchats" })
      await deleteUserChats()
      setChatMessages([])
      toast.success("Successfully deleted the chat!", { id: "loadchats" })
    } catch (error) {
      console.log(error)
      toast.error("Deleting Failed",  { id: "loadchats" })
    }
  }
  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 4
    }}>
      {/* Left side */}
      <Box sx={{
        display: { md: 'flex', xs: "none", sm: "none" ,flex: 0.2, flexDirection: 'column'}
      }}>
        <Box sx={{
          display: 'flex',
          width: "100%",
          height: "60vh",
          bgcolor: 'rgb(17,29,39)',
          borderRadius: 5,
          flexDirection: 'column',
          mx: 3
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "black",
            fontWeight: 700
          }}>{auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{
            mx: "auto",
            fontFamily: "work sans"
          }}>You are talking to a ChatBot</Typography>
          <Typography sx={{
            mx: "auto",
            fontFamily: "work sans",
            my: 4,
            p:3
          }}>Ask me questions 😊. But avoid sharing personal information</Typography>

          <Button
            onClick={deleteHandler}
            sx={{
            width: "200px",
            my: 'auto',
            color: 'white',
            fontWeight: '700',
            mx: 'auto',
            borderRadius: 3,
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400
            }
          }}>Clear Conversation</Button>
        </Box>
        
      </Box>
      

      {/* Right Side */}
      <Box sx={{
        display: 'flex',
        flex: { md: 0.8, xs: 1, sm: 1 },
        flexDirection: 'column',
        px: 3
      }}>
        <Typography sx={{
          textAlign: 'center',
          fontSize: "40px",
          color: "white",
          mb: 2,
          mx: 'auto',
          fontWeight: '600'
        }}>Model - GPT 3.5 Turbo
        </Typography>

        <Box sx={{
          width: "100%",
          height: '60vh' ,
          borderRadius: 3 , 
          mx: 'auto',
          display: 'flex' ,
          flexDirection: 'column',
          overflow: 'scroll',
          overflowX: 'hidden',
          overflowY: 'auto', 
          scrollBehavior: 'smooth'
        }}>{chatMessages.map((chat, index) => <ChatItem content={chat.content} role={chat.role} key={index}/>)}
        </Box>
        <div style={{
          width: '100%',
          padding: '20px',
          borderRadius: 8,
          backgroundColor:'rgb(17,27,39)' ,
          display:"flex",
          marginRight: "auto"
        }}>
          
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px'
            }}
          />
          
          <IconButton
            sx={{ ml: 'auto', color: "white", mx: 1}}
            onClick={submitHandler}
          ><IoMdSend />
          </IconButton>
          

        </div>
        
      </Box>

    </Box>
  )
}
