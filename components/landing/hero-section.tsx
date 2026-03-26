"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OrbitalHero } from "@/components/ui/orbital-hero"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-900/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20">
          {/* Left: copy */}
          <div className="flex flex-col gap-6 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm font-medium w-fit">
              <Sparkles size={14} />
              AI-Powered Job Search
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              Land Your{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-400 to-orange-400 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Optimize your resume, find the right people to network with, and
              close skill gaps — all powered by Claude AI.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/signup">
                <Button variant="gradient" size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              <div>
                <p className="text-2xl font-bold text-white">3x</p>
                <p className="text-xs text-gray-500">More Interviews</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-xs text-gray-500">Match Rate</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">5 min</p>
                <p className="text-xs text-gray-500">To Optimize</p>
              </div>
            </div>
          </div>

          {/* Right: orbital */}
          <div className="flex items-center justify-center">
            <OrbitalHero />
          </div>
        </div>
      </div>
    </section>
  )
}
