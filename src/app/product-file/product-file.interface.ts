export interface IProductFileDTO {
	id: string
	file_url: string
	filename: string
	size: number
	product_id: string
}

export interface IDeleteProductFileDTO {
	id: string
	product_id: string
}

export interface IProductsFileDTO {
	id: string
	file_url: string
}
