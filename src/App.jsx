import Header from './components/Header'
import Intro from './components/Intro'
import Highlights from './components/Highlights'
import Footer from './components/Footer'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CameraIntro from './components/CameraIntro'

function App() {
  return (
     <main className="bg-black">
      <Header/>
      <Intro/>
      <Highlights/>
      <Features/>
      <HowItWorks/>
      <CameraIntro/>
      <Footer/>
    </main>
  )
}

export default App
