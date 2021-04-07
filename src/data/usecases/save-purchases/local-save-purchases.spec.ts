import LocalSavePurchases from '@/data/usecases/save-purchases/local-save-purchases';
import { CacheStore } from '@/data/protocols/cache';

class CacheStoreSpy implements CacheStore {
	deleteCallsCount = 0;
	insertCallsCount = 0;

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


	test('should not insert new cache if delete fails', () => {
		const { sut, cacheStore } = makeSut();
		jest.spyOn(cacheStore, 'delete')
			.mockImplementationOnce(() => {
				throw new Error()
			})
		const promises = sut.save();

		expect(cacheStore.insertCallsCount).toBe(0);
		expect(promises).rejects.toThrow();
	});
})
