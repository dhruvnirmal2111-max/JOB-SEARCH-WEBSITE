import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { NewJobButton } from "@/components/dashboard/new-job-button"
import { JobCard } from "@/components/dashboard/job-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { FileText, Users, Brain, Briefcase, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const userId = session.user.id

  const [jobs, resumeCount, contactCount] = await Promise.all([
    prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        resumes: { orderBy: { createdAt: "desc" }, take: 1 },
        networkingResult: true,
        careerAnalysis: true,
      },
    }),
    prisma.resume.count({ where: { userId } }),
    prisma.contact.count({ where: { userId } }),
  ])

  const avgMatchRate = (() => {
    const withRate = jobs.flatMap(j => j.resumes).filter(r => r.matchRate !== null)
    if (!withRate.length) return 0
    return Math.round(withRate.reduce((s, r) => s + (r.matchRate ?? 0), 0) / withRate.length)
  })()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-400 mt-1">Your job search command centre</p>
        </div>
        <NewJobButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Jobs Tracked" value={jobs.length} icon={Briefcase} iconColor="text-blue-400" />
        <StatsCard title="Resumes Optimized" value={resumeCount} icon={FileText} iconColor="text-orange-400" />
        <StatsCard title="Contacts Found" value={contactCount} icon={Users} iconColor="text-orange-400" />
        <StatsCard
          title="Avg Match Rate"
          value={avgMatchRate > 0 ? `${avgMatchRate}%` : "—"}
          subtitle="keyword alignment"
          icon={TrendingUp}
          iconColor="text-green-400"
        />
      </div>

      {/* Jobs list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Your Jobs</h2>
          <p className="text-sm text-gray-500">{jobs.length} job{jobs.length !== 1 ? "s" : ""}</p>
        </div>

        {jobs.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center">
            <Briefcase size={40} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No jobs yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              Click <span className="text-orange-400 font-medium">New Job</span> to add a job description and start optimizing
            </p>
            <NewJobButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  id: job.id,
                  company: job.company,
                  role: job.role,
                  status: job.status,
                  createdAt: job.createdAt.toISOString(),
                  hasResume: job.resumes.length > 0,
                  hasNetworking: !!job.networkingResult,
                  hasCareer: !!job.careerAnalysis,
                  matchRate: job.resumes[0]?.matchRate ?? null,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick tools — no active job */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: "/resume", icon: FileText, title: "Resume Optimizer", desc: "Upload resume + JD → tailored bullets, keywords, cover letter", color: "orange" },
            { href: "/networking", icon: Users, title: "Networking Outreach", desc: "JD → 5 ranked contacts with personalized messages + calendar", color: "orange" },
            { href: "/career", icon: Brain, title: "Career Coach", desc: "Resume + JD → skill gaps, learning plan, interview questions", color: "orange" },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className={`group p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/5 hover:border-${tool.color}-500/30 transition-all duration-200`}
            >
              <tool.icon size={22} className={`text-${tool.color}-400 mb-3`} />
              <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
