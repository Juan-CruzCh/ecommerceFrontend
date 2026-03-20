
import { useEffect } from 'react'
import { useAutenticacionStore } from './core/context/Autenticacion'
import { AppRouter } from './core/router/Router'
import { Loader } from './core/components/Loader'

function App() {
  const {verificarAuth,isLoading} = useAutenticacionStore()  
  useEffect(() => {
    verificarAuth()
  }, [])
   if (isLoading) {
    return <Loader/>
  }
  return (
    <AppRouter />
  )
}

export default App
