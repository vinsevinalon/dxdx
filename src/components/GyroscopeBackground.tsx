'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const GyroscopeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const textureRef = useRef<THREE.Texture | null>(null)
  
  // Controls
  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsClient(true)
    setIsMobile(/Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    console.log('🚀 Starting GyroscopeBackground')

    // Basic Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Set refs
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera
    
    // Position camera at center
    camera.position.set(0, 0, 0)
    
    mountRef.current.appendChild(renderer.domElement)

    // Create a big sphere that surrounds the camera
    const geometry = new THREE.SphereGeometry(500, 32, 32)
    geometry.scale(-1, 1, 1) // Flip inside out
    
    // Start with a bright color to test
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00, // Bright green to test visibility
      side: THREE.BackSide
    })
    
    const sphere = new THREE.Mesh(geometry, material)
    sphereRef.current = sphere
    scene.add(sphere)
    
    console.log('✅ Green sphere created and added to scene')

    // Load the background texture
    const loader = new THREE.TextureLoader()
    
    console.log('📥 Loading /background-image.jpg...')
    
    loader.load(
      '/background-image.jpg',
      // Success
      (texture) => {
        console.log('✅ Texture loaded successfully!')
        textureRef.current = texture
        
        // Apply texture to sphere
        if (sphereRef.current) {
          const texturedMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
          })
          sphereRef.current.material.dispose()
          sphereRef.current.material = texturedMaterial
          console.log('🎨 Texture applied to sphere!')
        }
      },
      // Progress
      (progress) => {
        console.log('📊 Loading progress:', Math.round((progress.loaded / progress.total) * 100) + '%')
      },
      // Error
      (error) => {
        console.error('❌ Failed to load texture:', error)
        console.log('🔧 Keeping green color as fallback')
      }
    )

    // Mouse controls
    const onMouseDown = (event: MouseEvent) => {
      if (isMobile) return
      isDragging.current = true
      previousMouse.current = { x: event.clientX, y: event.clientY }
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging.current || isMobile || !cameraRef.current) return
      
      const deltaX = event.clientX - previousMouse.current.x
      const deltaY = event.clientY - previousMouse.current.y
      
      rotation.current.y -= deltaX * 0.01
      rotation.current.x -= deltaY * 0.01
      
      // Apply rotation to camera
      cameraRef.current.rotation.order = 'YXZ'
      cameraRef.current.rotation.x = rotation.current.x
      cameraRef.current.rotation.y = rotation.current.y
      
      previousMouse.current = { x: event.clientX, y: event.clientY }
    }

    const onMouseUp = () => {
      isDragging.current = false
    }

    // Device orientation for mobile
    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobile || !cameraRef.current) return
      
      console.log('📱 Device orientation:', event.alpha, event.beta, event.gamma)
      
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        cameraRef.current.rotation.order = 'YXZ'
        cameraRef.current.rotation.y = THREE.MathUtils.degToRad(-event.alpha || 0)
        cameraRef.current.rotation.x = THREE.MathUtils.degToRad((event.beta || 0) - 90)
        cameraRef.current.rotation.z = THREE.MathUtils.degToRad(event.gamma || 0)
      }
    }

    // Add event listeners
    if (isMobile) {
      // Mobile orientation
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS 13+
        const button = document.createElement('button')
        button.innerHTML = 'Enable Gyroscope'
        button.style.cssText = `
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
          z-index: 9999; padding: 20px 40px; font-size: 18px; 
          background: #007AFF; color: white; border: none; border-radius: 10px;
        `
        button.onclick = async () => {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', onDeviceOrientation)
          }
          button.remove()
        }
        document.body.appendChild(button)
      } else {
        // Non-iOS
        window.addEventListener('deviceorientation', onDeviceOrientation)
      }
    } else {
      // Desktop mouse
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }
    animate()

    // Resize handler
    const onResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', onResize)

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up')
      
      window.removeEventListener('resize', onResize)
      
      if (isMobile) {
        window.removeEventListener('deviceorientation', onDeviceOrientation)
      } else {
        document.removeEventListener('mousedown', onMouseDown)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (textureRef.current) textureRef.current.dispose()
    }
  }, [isClient, isMobile])

  if (!isClient) {
    return <div className="fixed inset-0 bg-black z-0" />
  }

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ touchAction: 'pan-y' }}
    />
  )
}

export default GyroscopeBackground