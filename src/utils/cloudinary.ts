import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImageCloudinary = async (
	filePath: string,
	folder: 'profile' | 'post',
) => {
	return await cloudinary.uploader.upload(filePath, {
		folder,
	})
}

export const updateImageCloudinary = async (
	filePath: string,
	publicId: string,
) => {
	return await cloudinary.uploader.upload(filePath, {
		public_id: publicId,
		overwrite: true,
	})
}

export const deleteImageCloudinary = async (publicId: string) => {
	return await cloudinary.uploader.destroy(publicId, { invalidate: true })
}
