'use client'

import { Button } from '@/components/ui/button'

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to learn, build, or publish, TechGajana has the right solution for you.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-8 font-medium hover-lift">
            Book a Class
          </Button>
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/5 rounded-lg h-12 px-8 font-medium hover-lift"
          >
            Browse Store
          </Button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground">
          Questions? Contact us at hello@techgajana.com or chat with our support team.
        </p>
      </div>
    </section>
  )
}
