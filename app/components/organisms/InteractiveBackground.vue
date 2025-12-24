<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number | null = null
let particles: Particle[] = []

// Mouse state with Trail for "Wake" effect
const mouse = { x: -1000, y: -1000, vx: 0, vy: 0 }
let lastMouse = { x: 0, y: 0 }

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  width: number
  speed: number
  baseY: number
  color: string
}

// Config
const PARTICLE_COUNT = 40 // Further reduced for subtlety
const SPACING = 15 

const initParticles = (width: number, height: number) => {
  particles = []
  // Create rows of streams
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = Math.random() * height
    const speed = Math.random() * 2 + 0.5 // Restored Speed
    
    // Blue:Gray ratio 1:3 (25% blue, 75% gray)
    const isAccent = Math.random() < 0.25
    const color = isAccent 
      ? `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})` // Blue accent
      : `rgba(113, 113, 122, ${Math.random() * 0.15 + 0.05})` // Zinc subtle

    particles.push({
      x: Math.random() * width,
      y: y,
      baseY: y,
      vx: speed,
      vy: 0,
      len: Math.random() * 50 + 20, // Restored length var
      width: Math.random() * 2 + 0.5,
      speed: speed,
      color: color
    })
  }
}

const handleResize = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  initParticles(window.innerWidth, window.innerHeight)
}

const handleMouseMove = (e: MouseEvent) => {
  lastMouse.x = mouse.x
  lastMouse.y = mouse.y
  mouse.x = e.clientX
  mouse.y = e.clientY
  
  // Calculate mouse velocity for "impact" force
  mouse.vx = mouse.x - lastMouse.x
  mouse.vy = mouse.y - lastMouse.y
}

const draw = () => {
  if (!canvasRef.value || !ctx) return
  
  const width = canvasRef.value.width
  const height = canvasRef.value.height
  
  // Trail effect: instead of clearRect, draw semi-transparent black rect?
  // No, clean clear is sharper for tech look.
  ctx.clearRect(0, 0, width, height)
  
  particles.forEach(p => {
    // 1. Physics: Move Forward
    p.x += p.vx
    
    // 2. Physics: Return to Base Y (Elasticity)
    const returnForce = (p.baseY - p.y) * 0.05
    p.vy += returnForce
    p.vy *= 0.9 // Friction
    
    // 3. Interaction: Mouse Repulsion (Push lines away vertically)
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const interactRadius = 150
    
    if (dist < interactRadius) {
      const force = (1 - dist / interactRadius) * 2
      // Push down if mouse is above, push up if mouse is below
      // But also follow mouse velocity?
      // Simple push:
      if (dy > 0) p.vy -= force // Mouse is below, push up? No, usually push AWAY.
      else p.vy += force
      
      // Or Push in direction of mouse movement (Turbulence)
      // p.vx += mouse.vx * 0.05
    }

    p.y += p.vy
    
    // Wrap around screen
    if (p.x > width + 100) p.x = -100
    if (p.x < -100) p.x = width + 100
    
    // Draw Line - with null check for ctx
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x - p.len, p.y) // Trail behind
      ctx.strokeStyle = p.color
      ctx.lineWidth = p.width
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  })

  
  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    draw()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0">
    <!-- Aero Streams Canvas -->
    <canvas ref="canvasRef" class="block w-full h-full"></canvas>
  </div>
</template>
