'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function UploadForm() {
  const [name, setName] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      setStatus('error')
      setMessage('Por favor, selecciona al menos una foto o video.')
      return
    }

    if (files.length > 10) {
      setStatus('error')
      setMessage('Por favor, selecciona un máximo de 10 archivos.')
      return
    }

    setStatus('loading')
    setMessage('Subiendo archivos...')

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Error al subir el archivo')
        }

        return await response.json()
      } catch (error) {
        console.error('Error:', error)
        throw error
      }
    })

    try {
      await Promise.all(uploadPromises)
      setStatus('success')
      setMessage('¡Archivos subidos con éxito!')
      setName('')
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      router.refresh()
    } catch (error) {
      setStatus('error')
      setMessage('Error al subir los archivos. Por favor, intenta de nuevo.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 10) {
      setStatus('error')
      setMessage('Por favor, selecciona un máximo de 10 archivos.')
    } else {
      setFiles(selectedFiles)
      setStatus('idle')
      setMessage('')
    }
  }

  const renderPreview = (file: File) => {
    const isImage = file.type.startsWith('image/')
    // const isVideo = file.type.startsWith('video/')
    const url = URL.createObjectURL(file)

    return (
      <div key={file.name} className="relative w-20 h-20 m-1">
        {isImage && (
          <Image
            src={url}
            alt={file.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        )}
        {/* {isVideo && (
          <video className="w-full h-full rounded object-cover">
            <source src={url} type={file.type} />
          </video>
        )} */}
        <button
          onClick={() => setFiles(files.filter(f => f !== file))}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
          Fotos y Videos (máximo 10)
        </label>
        <input
          type="file"
          id="files"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="mt-1 block w-full"
        />
      </div>
      {files.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
          <div className="flex flex-wrap">
            {files.map(renderPreview)}
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {status === 'loading' ? 'Subiendo...' : 'Subir Archivos'}
      </button>
      {message && (
        <div
          className={`mt-4 p-2 rounded ${
            status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  )
}