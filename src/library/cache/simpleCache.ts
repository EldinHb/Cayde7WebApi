export class SimpleCache {
	private readonly cache: Map<string, any> = new Map();

	public set(key: string, value: any) {
		this.cache.set(key, value);
	}

	public get(key: string) {
		return this.cache.get(key);
	}

	public has(key: string) {
		return this.cache.has(key);
	}

	public clear() {
		this.cache.clear();
	}
}
