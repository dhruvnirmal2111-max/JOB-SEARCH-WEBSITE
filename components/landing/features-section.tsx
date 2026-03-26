import { FeatureSteps } from "@/components/ui/feature-steps"

const features = [
  {
    step: "Step 1",
    title: "Optimize Your Resume",
    content:
      "Upload your resume and job description. AI matches keywords, rewrites bullets for impact, and generates a tailored cover letter with match score.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Find Your Network",
    content:
      "Discover 5 high-value contacts (2 peers, 1 manager, 1 recruiter, 1 senior) at your target company with personalized outreach messages per persona.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Close Your Skill Gaps",
    content:
      "Get a precise skill gap analysis, prioritized learning plan with real resources, and 4 categories of role-specific interview questions.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  },
]

export function FeaturesSection() {
  return (
    <section id="how-it-works" className="py-20 border-t border-white/5">
      <FeatureSteps
        features={features}
        title="Your Job Search, Supercharged"
        autoPlayInterval={4000}
      />
    </section>
  )
}
