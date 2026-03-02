import react from 'react'
import viteLogo from '/vite.svg'
import AppRouter from './AppRouter'
import "./features/auth/shared/style.scss";
import { Authprovider } from './features/auth/Auth.Context'
import { Postcontextprovider } from './features/Posts/Postcontext';
import { FollowContextProvider } from './features/Posts/Followcontext';


function App() {

  return (


    <Authprovider>
      <FollowContextProvider>
        <Postcontextprovider>
          <AppRouter />
        </Postcontextprovider>
      </FollowContextProvider>
    </Authprovider>

  )
}

export default App
