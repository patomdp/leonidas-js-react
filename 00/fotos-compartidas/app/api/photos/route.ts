import { NextResponse } from 'next/server'
import cloudinary from '../../../lib/cloudinary'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const name = formData.get('name') as string

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'FotosCompartidas',
      public_id: `${name}_${Date.now()}`, // Asegura nombres únicos
    })

    // Aquí deberías guardar la información de la foto en una base de datos
    // Por ahora, solo devolveremos la URL de la imagen subida

    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:FotosCompartidas')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute()

    const photos = result.resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      name: resource.filename.split('_')[0], // Asumiendo que el nombre está antes del primer guion bajo
    }))

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos from Cloudinary:', error)
    return NextResponse.json({ error: 'Error fetching photos' }, { status: 500 })
  }
}