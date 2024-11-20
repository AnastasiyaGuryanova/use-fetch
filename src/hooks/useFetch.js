import { useState, useEffect } from 'react';

function constructUrlWithParams(url, params = {}) {
	const urlObj = new URL(url);

	Object.keys(params).forEach((key) => {
		urlObj.searchParams.append(key, params[key]);
	});

	return urlObj.toString();
}

export const useFetch = (initialUrl) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async (url, options = {}) => {
		setIsLoading(true);
		setError(null);

		const { params, ...fetchOptions } = options;

		const finalUrl = params ? constructUrlWithParams(url, params) : url;

		try {
			const response = await fetch(finalUrl, fetchOptions);

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`);
			}

			const result = await response.json();
			setData(result);
		} catch (error) {
			setError(error);
			setData(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(initialUrl);
	}, [initialUrl]);

	const refetch = (options = {}) => {
		fetchData(initialUrl, options);
	};

	return { data, isLoading, error, refetch };
};
