import type { Metadata } from 'next'
import CampusPageClient from './CampusPageClient'

export const metadata: Metadata = {
  title: 'Campus Training Programs for Colleges',
  description:
    'Equip your students with industry-ready technology skills through customised campus training. TechGajana delivers hands-on programs in software development, AI, data, and more.',
  keywords: [
    'campus training programs',
    'college technology training',
    'student skill development',
    'campus placement training',
    'software training for colleges',
    'industry-ready student programs',
  ],
  alternates: {
    canonical: '/campus',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.techgajana.org/campus',
    title: 'Campus Training Programs for Colleges | TechGajana',
    description:
      'Customised, hands-on technology training that helps colleges prepare students for careers in software, AI, data, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Training Programs for Colleges | TechGajana',
    description:
      'Customised, hands-on technology training that helps colleges prepare students for careers in software, AI, data, and more.',
  },
}

export default function CampusPage() {
  return <CampusPageClient />
}
