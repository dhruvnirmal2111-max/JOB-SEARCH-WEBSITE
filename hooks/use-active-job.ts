"use client"

import { useState, useEffect } from "react"

export function useActiveJob() {
  const [jobId, setJobIdState] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setJobIdState(localStorage.getItem("activeJobId"))
    setReady(true)
  }, [])

  const setActiveJob = (id: string) => {
    localStorage.setItem("activeJobId", id)
    setJobIdState(id)
  }

  const clearActiveJob = () => {
    localStorage.removeItem("activeJobId")
    setJobIdState(null)
  }

  return { jobId, setActiveJob, clearActiveJob, ready }
}
