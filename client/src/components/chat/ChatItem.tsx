import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const extractCode = (message: string) => {
    if (message.includes("```")) {
        const blocks = message.split("```")
        return blocks
    }
}

const verifyCodeBlock = (str: string) => {
    if (
        str.includes('=') ||
        str.includes(';') ||
        str.includes('[') ||
        str.includes(']') ||
        str.includes('{') ||
        str.includes('}') ||
        str.includes('//') ||
        str.includes('#') 
    ) {
        return true
    }
    return false
} 



export default function ChatItem({ content, role }: {
    content: string;
    role: 'user' | 'assistant'
}) {
    const messageBlocks = extractCode(content)
    
    const auth = useAuth()
  return (
      role === 'assistant' ?
          (<Box sx={{
              display: 'flex',
              p: 2,
              bgcolor: '#004d5612',
              my: 2,
              gap: 2,
              borderRadius: 2
          }}>
              <Avatar sx={{ml: '0'}}>
                  <img src="openai.png" alt="openai" width={'30px'}/>
              </Avatar>
              <Box>
                  {!messageBlocks && (<Typography fontSize={'20px'}>{content}</Typography>)}
                  {messageBlocks && messageBlocks.length &&
                      messageBlocks.map((block) => verifyCodeBlock(block) ? (
                        <SyntaxHighlighter style={coldarkDark} language='javascript' >
                              {block}
                        </SyntaxHighlighter>
                      ) : (<Typography fontSize={'20px'}>{block}</Typography>))}
              </Box>
          </Box>)
          :
          (<Box sx={{
              display: 'flex',
              p: 2,
              bgcolor: '#004d56',
              my: 2,
              gap: 2,
              borderRadius: 2
          }}>
              <Avatar sx={{
                  ml: 0,
                  bgcolor: "black",
                  color: 'white'
              }}>
                {auth?.user?.name[0].toUpperCase()}
                {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
              <Box>
                  {!messageBlocks && (<Typography fontSize={'20px'}>{content}</Typography>)}
                  {messageBlocks && messageBlocks.length &&
                      messageBlocks.map((block) => verifyCodeBlock(block) ? (
                        <SyntaxHighlighter style={coldarkDark} language='javascript' >
                              {block}
                        </SyntaxHighlighter>
                      ) : (<Typography fontSize={'20px'}>{block}</Typography>))}
              </Box>
          </Box>)
  )
}
