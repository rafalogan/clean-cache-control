import { CacheStore } from '@/data/protocols/cache';
import { SavePurchases } from '@/domain';


export default class LocalSavePurchases implements SavePurchases{
	constructor(private readonly cacheStore: CacheStore) {
	}

	async save(purchases: SavePurchases.Params[]): Promise<any> {
		this.cacheStore.delete('purchases');
		this.cacheStore.insert('purchases', purchases);
	}
}
