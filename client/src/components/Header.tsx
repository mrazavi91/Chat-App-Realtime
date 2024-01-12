
import AppBar from "@mui/material/AppBar"
import { Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'

export default function Header() {
  const auth = useAuth()
  return (
    <AppBar sx={{bgcolor: "transparent" , position:'static' , boxShadow: "none"}}>
      <Toolbar sx={{display: 'flex'}}>
        <Logo />
        <div className="">
          {auth?.isLoggedIn ? <>
            <NavigationLink
              bg='#00fffc'
              to='/chat'
              text='Go to Chat'
              textColor='black'
            />
            <NavigationLink
              bg='#515538f'
              to='/'
              text='Logout'
              textColor='white'
              onClick={auth.logout}
            />
          </> : <>
              <NavigationLink
              bg='#00fffc'
              to='/login'
              text='Login'
              textColor='black'
            />
            <NavigationLink
              bg='#515538f'
              to='/signup'
              text='Signup'
              textColor='white'
            />
          </>}
        </div>
      </Toolbar>
    </AppBar>
  )
}
