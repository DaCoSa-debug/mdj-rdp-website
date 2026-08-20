import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Donation from '../components/Donation'

export default function Don() {
  return <><Header /><main><h1 className="sr-only">Faire un don à la Maison des jeunes de Rivière-des-Prairies</h1><Donation /></main><Footer /><WhatsAppButton /></>
}
