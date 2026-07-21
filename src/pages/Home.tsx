import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Programs from '../components/Programs'
import CIECSection from '../components/CIEC'
import Events from '../components/Events'
import Testimonials from '../components/Testimonials'
import Donation from '../components/Donation'
import Newsletter from '../components/Newsletter'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Programs />
        <CIECSection />
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
