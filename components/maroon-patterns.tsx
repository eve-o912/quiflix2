"use client"

import { useEffect, useRef } from "react"

export function MaroonPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize particles array first
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }[] = []

    // Draw subtle maroon lines
    function drawMaroonLines() {
      ctx.strokeStyle = "rgba(166, 30, 57, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let i = 0; i < 10; i++) {
        const y = Math.random() * canvas.height
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Draw floating particles
    function drawParticles() {
      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(166, 30, 57, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw maroon patterns
    function drawPatterns() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a radial gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.5,
      )
      gradient1.addColorStop(0, "rgba(166, 30, 57, 0.2)")
      gradient1.addColorStop(0.5, "rgba(166, 30, 57, 0.05)")
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create another radial gradient
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.6,
      )
      gradient2.addColorStop(0, "rgba(166, 30, 57, 0.15)")
      gradient2.addColorStop(0.6, "rgba(166, 30, 57, 0.03)")
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle maroon lines
      drawMaroonLines()

      // Draw floating particles
      drawParticles()
    }

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reinitialize particles when canvas is resized
      particles.length = 0
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }

      drawPatterns()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animate particles
    let animationFrameId: number

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Redraw gradients
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.5,
      )
      gradient1.addColorStop(0, "rgba(166, 30, 57, 0.2)")
      gradient1.addColorStop(0.5, "rgba(166, 30, 57, 0.05)")
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.6,
      )
      gradient2.addColorStop(0, "rgba(166, 30, 57, 0.15)")
      gradient2.addColorStop(0.6, "rgba(166, 30, 57, 0.03)")
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw lines
      drawMaroonLines()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.y -= particle.speed

        // Reset particle if it goes off screen
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size
          particle.x = Math.random() * canvas.width
        }

        ctx.fillStyle = `rgba(166, 30, 57, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.8 }} />
}
