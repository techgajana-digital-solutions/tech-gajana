'use client'

export default function TrustBar() {
  const stats = [
    { number: '500+', label: 'Students Mentored' },
    { number: '50+', label: 'Projects Delivered' },
    { number: '20+', label: 'Research Papers Published' },
    { number: '4.8★', label: 'Average Rating' },
  ]

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
