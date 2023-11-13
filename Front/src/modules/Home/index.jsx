import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    const fetchData = async () => {
    }
    fetchData()
  }, [])
  const img = '../../img/home.png';
  return <img src='https://img.freepik.com/vector-premium/servicio-salud-medica_18591-806.jpg'></img>
}

export default Home
