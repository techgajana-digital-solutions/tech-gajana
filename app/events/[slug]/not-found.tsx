import { Poppins } from 'next/font/google'
import Navbar from '@/components/navbar'
import RiseLabFooter from '@/components/events/riselabfooter'
import NoEventsState from '@/components/events/NoEventsState'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function EventNotFound() {
  return (
    <>
      <Navbar />
      <main className={`${poppins.className} pt-32 pb-20 px-6 lg:px-12`} style={{ backgroundColor: '#FDFBFC' }}>
        <div className="max-w-2xl mx-auto">
          <NoEventsState variant="detail" />
        </div>
      </main>
      <RiseLabFooter />
    </>
  )
}