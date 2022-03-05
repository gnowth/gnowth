import { v4 as uuid } from 'uuid'

export interface ErrorType {
	idLocal: string
	message: string
	title: string
}

class ModelError {
	static deserialize = (error: Error): ErrorType => {
		return {
			idLocal: uuid(),
			message: error.message,
			title: error.name,
		}
	}

	static toId = (error: ErrorType) => {
		return error.idLocal
	}

	static toString = (error: ErrorType) => {
		return error.message
	}

	static toTitle = (error: ErrorType) => {
		return error.title
	}

	static toToast = (error: ErrorType) => {
		return {
			description: ModelError.toString(error),
			isClosable: true,
			status: 'error' as const,
			title: ModelError.toTitle(error),
		}
	}
}

export default ModelError
