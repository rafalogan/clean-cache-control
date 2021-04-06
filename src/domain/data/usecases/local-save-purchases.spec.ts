class LocalSavePurchases {
	constructor(private readonly cacheStore: CacheStore) {
	}

	async save(): Promise<any> {
		this.cacheStore.delete('purchases');
	}
}

interface CacheStore {
	delete: (key: string) => void;
}

class CacheStoreSpy implements CacheStore {
	deleteCallsCount = 0
	key: string | undefined;

	delete(key: string): void {
		this.deleteCallsCount++;
		this.key = key;
	}
}

type SutTypes = {
	sut: LocalSavePurchases;
	cacheStore: CacheStoreSpy;
}

const makeSut = (): SutTypes => {
	const cacheStore = new CacheStoreSpy();
	const sut = new LocalSavePurchases(cacheStore);

	return {sut, cacheStore};
}

describe('#LocalSavePurchases', () => {
	test('Should not delete cache on sut.init', () => {
		const { cacheStore } = makeSut();

		expect(cacheStore.deleteCallsCount).toBe(0);
	});

	test('should delete old cache on sut.save', () => {
		const { sut, cacheStore } = makeSut();
		sut.save();

		expect(cacheStore.deleteCallsCount).toBe(1);
		expect(cacheStore.key).toBe('purchases');
	});
	
})
