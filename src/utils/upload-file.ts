import path from 'path'

import type { Request } from 'express'
import multer, { type FileFilterCallback } from 'multer'

import {
	DIRECTORY_NAME,
	ERROR_CODE,
	type RequestFilePayload,
} from '../interface'
import { AppError } from '../middleware'

import { MESSAGE } from './messages'

const FILE_TYPE_MAP: Record<string, string> = {
	'image/jpeg': '.jpeg',
	'image/jpg': '.jpg',
	'image/png': '.png',
}

export const storageConfig = (directory: string) => {
	const storage = multer.diskStorage({
		destination(req, file, callback) {
			callback(
				null,
				path.join(__dirname, '..', '..', DIRECTORY_NAME.BASE, directory),
			)
		},
		filename(req: Request, file: Express.Multer.File, callback) {
			const ext = path.extname(file.originalname)
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
			const formatFilename = `${file.fieldname}-${uniqueSuffix}${ext}`
			;(req as unknown as RequestFilePayload).fileUrl = formatFilename
			callback(null, formatFilename)
		},
	})
	return storage
}

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: FileFilterCallback,
): void => {
	if (file.mimetype !== '' && FILE_TYPE_MAP[file.mimetype]) {
		callback(null, true)
	} else {
		callback(null, false)
		callback(
			new AppError(
				ERROR_CODE.BAD_REQUEST.code,
				MESSAGE.ERROR.FILE.INVALID_TYPE,
			),
		)
	}
}

export const uploadConfig = (storage: multer.StorageEngine) => {
	const config = multer({
		storage,
		fileFilter,
		limits: {
			fileSize: 1024 * 1024 * 2,
		},
	})
	return config
}
