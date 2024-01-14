// import axios from "../axios";



export const loginUser = async (email: string , password: string) => {
    // const res = await axios.post('/user/login', { email, password })
    // if (res.status !== 200) {
    //     throw new Error("Unable to Login")
    // }
    // const res = await axios.post("/api/v1/user/login", { email, password });
    //     if (res.status !== 200) {
    //         throw new Error("Unable to login");
    //     }
    //     const data = await res.data;
    //     return data;

    const res = await fetch('/api/v1/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
    
    const data = await res.json();
    

    return data
    
}

export const checkAuthStatus = async () => {

    try {

    //     // const res = await axios.get("/api/v1/user/auth-status");
    //     // if (res.status !== 200) {
    //     //     throw new Error("Unable to authenticate");
    //     // }
    //     // const data = await res.data;
    //     // return data;


        const res = await fetch('/api/v1/user/auth-status')
        const data = await res.json()

        return data
    
        
    } catch (error) {
        throw new Error("You are not Authorized because you are not logged in!")
    }
    
}

export const sendChatRequest = async (message: string) => {
    // const res = await axios.post('/chat/new', {message})
    // if (res.status !== 200) {
    //     throw new Error("Can not send the message")
    // }
    // const data = await res.data

    // return data
    const res = await fetch('/api/v1/chat/new', {
         method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
    })

    const data = await res.json();
    

    return data
    
}



export const getUserChats = async () => {
    // const res = await axios.get('/api/v1/chat/all-chats')
    // if (res.status !== 200) {
    //     throw new Error("Unable to authenticate")
    // }
    // const data = await res.data

    // return data
    try {
        const res = await fetch('/api/v1/chat/all-chats')
        if (res.status !== 200) {
            throw new Error('Unable to authenticate!')
        }
        const data = res.json()
        return data
    } catch (error) {
        console.log(error, 'logout')
        
    }
    
    
}

export const deleteUserChats = async () => {
    // const res = await axios.delete('/chat/delete')
    // if (res.status !== 200) {
    //     throw new Error("Unable to delete the chat!")
    // }
    // const data = await res.data

    // return data
    try {
        const res = await fetch('/api/v1/chat/delete')
        if (res.status !== 200) {
            throw new Error('Unable to clear the chat!')
        }
        const data = res.json()
        return data
    } catch (error) {
        console.log(error, 'logout')
        
    }
    

    
}

export const userLogout = async () => {
    // const res = await axios.get('/api/v1/user/logout')
    // if (res.status !== 200) {
    //     throw new Error("Unable logout!")
    // }
    // const data = await res.data

    // return data

    try {
        const res = await fetch('/api/v1/user/logout')
        if (res.status !== 200) {
            throw new Error('Unable to log out!')
        }
        const data = res.json()
        return data
    } catch (error) {
        console.log(error, 'logout')
        
    }
    
}

//sign up 
export const signupUser = async (name: string, email: string , password: string) => {
    // const res = await axios.post('/api/v1/user/signup', { name, email, password })
    // if (res.status !== 201) {
    //     throw new Error("Unable to Signup ")
    // }
    // const data = await res.data

    // return data
    const res = await fetch('/api/v1/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
      });
    
    const data = await res.json();
    

    return data
    
}