import type { Product, ProductFiles, User } from '../../prisma/client'
import type {
	IProductsFileDTO,
	IProductFileDTO,
} from '../product-file/product-file.interface'
import { type IUserDTO } from '../user/user.interface'

export interface IProductsWithFile extends Product {
	product_file: ProductFiles
}

export interface IProductUser extends IProductsWithFile {
	user: User
}

export interface IProductDTO {
	id: string
	name: string
	desc: string
	price: number
	stock: number
	user?: IUserDTO
	product_file?: IProductFileDTO | IProductsFileDTO | null
}
