import { CacheStore } from '@/data/protocols/cache';


export default class LocalSavePurchases {
	constructor(private readonly cacheStore: CacheStore) {
	}

	async save(): Promise<any> {
		this.cacheStore.delete('purchases');
	}
}
