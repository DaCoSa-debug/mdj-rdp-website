import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Evenements() {
  return (
    <>
      <Header />
      <main>
        <div className="py-20 text-center text-gray-400">Événements — à venir</div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
