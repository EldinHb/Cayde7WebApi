import { AxiosInstance, Method } from 'axios';
import { SimpleCache } from '../cache/simpleCache';
import { ServerResponse } from './common';

interface RequestConfig {
	params?: { [key: string]: any },
	method?: Method;
}

export abstract class DestinyApi {

	constructor(protected readonly httpClient: AxiosInstance, private readonly cache: SimpleCache) { }

	protected async request<T>(url: string, config?: RequestConfig, refresh = false) {
		const cacheKey = this.createCacheKey(url, config && config.params);
		if (this.cache.has(cacheKey) && !refresh) {
			return this.cache.get(cacheKey);
		}

		const result = await this.httpClient.get<ServerResponse<T>>(url, {
			params: config && config.params,
			method: (config && config.method) ?? 'GET'
		});

		this.cache.set(cacheKey, result);

		return result;
	}

	private createCacheKey(url: string, params?: { [key: string]: any }) {
		if (params) {
			const paramKeys = Object.entries(params).flatMap(x => x.join(':'));
			return `${url}-${paramKeys.join('-')}`;
		}

		return url;
	}
}
