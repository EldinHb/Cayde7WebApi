export class Lazy<T> {
	private _value: T | undefined = undefined;
	private _init: () => T;

	constructor(init: () => T) {
		this._init = init;
	}

	public get value(): T {
		return this._value ||= this._init();
	}
}

export class LazyAsync<T> {
	private _value: T | undefined = undefined;
	private _init: () => Promise<T>;

	constructor(init: () => Promise<T>) {
		this._init = init;
	}

	public async value(): Promise<T> {
		return this._value ||= await this._init();
	}
}
