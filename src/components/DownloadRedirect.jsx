// src/components/DownloadRedirect.jsx
import { useEffect } from 'react'

export default function DownloadRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera

    if (/android/i.test(ua)) {
      window.location.replace(
        'https://play.google.com/store/apps/details?id=com.COTOLORE.Kealthy'
      )
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      window.location.replace(
        'https://apps.apple.com/in/app/kealthy/id6740621148'
      )
    } else {
      // fallback to a landing page or show a message
      window.location.replace('https://kealthy.com/')
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Redirecting…</p>
    </div>
  )
}
