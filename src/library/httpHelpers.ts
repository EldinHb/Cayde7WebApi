import { AxiosResponse } from 'axios';

export const isSuccesStatusCode = (response: AxiosResponse) => {
	switch (response.status.toString()[0]) {
		case '1':
		case '2':
		case '3':
			return true;
		case '4':
		case '5':
			return false;
	}

	return false;
};

export interface ErrorMessage {
	errorMessage: string;
}
export const createErrorMessage = (error: string): ErrorMessage => ({
	errorMessage: error
});
