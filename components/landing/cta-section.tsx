import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to land your{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">
            dream job?
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of job seekers using AI to get more interviews,
          stronger networks, and faster offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button variant="gradient" size="lg" className="gap-2 w-full sm:w-auto">
              Start for Free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
