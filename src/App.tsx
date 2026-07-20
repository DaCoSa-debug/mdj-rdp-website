import './styles/globals.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Programs from './components/Programs'
import CIEC from './components/CIEC'
import Events from './components/Events'
import Testimonials from './components/Testimonials'
import Donation from './components/Donation'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Programs />
        <CIEC />
        <Events />
        <Testimonials />
        <Donation />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
