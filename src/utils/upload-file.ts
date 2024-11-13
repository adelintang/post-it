import type { Request } from 'express'
import multer, { type FileFilterCallback } from 'multer'

import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware'

import { MESSAGE } from './messages'

const FILE_TYPE_MAP: Record<string, string> = {
	'image/jpeg': '.jpeg',
	'image/jpg': '.jpg',
	'image/png': '.png',
}

const storage = multer.diskStorage({
	filename(req: Request, file: Express.Multer.File, callback) {
		callback(null, file.originalname)
	},
})

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

export const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
})
