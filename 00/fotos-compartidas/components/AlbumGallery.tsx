'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Photo {
  id: string
  url: string
  name: string
}

export default function AlbumGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/photos')
      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }
      const data = await response.json()
      setPhotos(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching photos:', error)
      setError('Error al cargar las fotos. Por favor, intenta de nuevo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  const openFullscreen = (index: number) => {
    setCurrentPhotoIndex(index)
  }

  const closeFullscreen = () => {
    setCurrentPhotoIndex(null)
  }

  const nextPhoto = () => {
    if (currentPhotoIndex !== null) {
      setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (currentPhotoIndex !== null) {
      setCurrentPhotoIndex((currentPhotoIndex - 1 + photos.length) % photos.length)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Cargando fotos...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (photos.length === 0) {
    return <div className="text-center py-10">No hay fotos en el álbum aún.</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Álbum de Fotos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => openFullscreen(index)}>
            <Image
              src={photo.url}
              alt={`Foto subida por ${photo.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm truncate">{photo.name}</p>
            </div>
          </div>
        ))}
      </div>

      {currentPhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={photos[currentPhotoIndex].url}
              alt={`Foto subida por ${photos[currentPhotoIndex].name}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              priority
            />
            <button onClick={closeFullscreen} className="absolute top-4 right-4 text-white">
              <XIcon size={24} />
            </button>
            <button onClick={prevPhoto} className="absolute left-4 text-white">
              <ChevronLeftIcon size={24} />
            </button>
            <button onClick={nextPhoto} className="absolute right-4 text-white">
              <ChevronRightIcon size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}