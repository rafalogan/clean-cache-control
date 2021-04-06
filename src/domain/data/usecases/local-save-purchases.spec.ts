class LocalSavePurchases {
	constructor(private readonly cacheStore: CacheStore) {
	}

	async save(): Promise<any> {
		this.cacheStore.delete();
	}
}

interface CacheStore {
	delete: () => void;
}

class CacheStoreSpy implements CacheStore {
	deleteCallsCount = 0

	delete(): void {
		this.deleteCallsCount++
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
	});
})
