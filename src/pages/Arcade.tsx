import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import QuizGame from '../components/QuizGame'

export default function Arcade() {
  return (
    <>
      <Header />
      <section className="bg-[#1a1a1a] min-h-screen">
        <QuizGame />
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
