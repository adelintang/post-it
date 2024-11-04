export const cleanJoiErrorMessage = (error: any) => {
	if (error.isJoi) {
		const { details } = error
		const message = details
			.map((i: any) => i.message.replace(/"/g, ''))
			.join(', ')
		return message
	}
	return error.message
}

export const joiGeneralMessage = {
	'string.base': 'The {#label} value must be of type text.',
	'string.empty': '{#label} cannot be empty.',
	'string.email': 'The email format in {#label} is invalid.',
	'any.required': '{#label} is required.',
	'string.min': '{#label} must be at least {#limit} characters long.',
	'any.only': 'type must be one of {#valids}',
	'boolean.base': 'The value of {#label} must be a boolean.',
	'number.min': '{#label} harus minimal {#limit}',
	'number.base': 'The value of {#label} must be a number type.',
}
