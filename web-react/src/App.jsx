// import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import './App.scss'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'

function App() {
  // const [count, setCount] = useState(0)

  return (

      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>

  )
}

export default App
