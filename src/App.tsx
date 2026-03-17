
import { useEffect } from 'react'
import { useAutenticacionStore } from './core/context/Autenticacion'
import { AppRouter } from './core/router/Router'

function App() {
  const {verificarAuth} = useAutenticacionStore()
  useEffect(() => {
    verificarAuth()
  }, [])
  
  return (
    <AppRouter />
  )
}

export default App
