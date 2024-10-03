import AlbumGallery from '../components/AlbumGallery'
import UploadForm from '../components/UploadForm'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">FotosCompartidas</h1>
      <UploadForm />
      <AlbumGallery />
    </main>
  )
}