import LocalSavePurchases from '@/data/usecases/save-purchases/local-save-purchases';
import { CacheStore } from '@/data/protocols/cache';
import { SavePurchases } from '@/domain';

class CacheStoreSpy implements CacheStore {
	deleteCallsCount = 0;
	insertCallsCount = 0;

	deleteKey: string | undefined;
	insertKey: string | undefined;
	insertValues: SavePurchases.Params[] = []

	delete(key: string): void {
		this.deleteCallsCount++;
		this.deleteKey = key;
	}

	insert(key: string, values: any): void {
		this.insertCallsCount++;
		this.insertKey = key
		this.insertValues = values
	}
}

const mockPurchases = (): Array<SavePurchases.Params> => [
	{
		id: '1',
		date: new Date(),
		value: 50
	},
	{
		id: '2',
		date: new Date(),
		value: 70
	}
];

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
		sut.save(mockPurchases());

		expect(cacheStore.deleteCallsCount).toBe(1);
		expect(cacheStore.deleteKey).toBe('purchases');
	});

	test('should not insert new cache if delete fails', () => {
		const { sut, cacheStore } = makeSut();
		jest.spyOn(cacheStore, 'delete')
			.mockImplementationOnce(() => {
				throw new Error()
			})
		const promises = sut.save(mockPurchases());


		expect(cacheStore.insertCallsCount).toBe(0);
		expect(promises).rejects.toThrow();
	});

	test('should inset new Cache if delete succeeds', async () => {
		const { sut, cacheStore } = makeSut();
		const purchases = mockPurchases();
		await sut.save(purchases);

		expect(cacheStore.deleteCallsCount).toBe(1);
		expect(cacheStore.insertCallsCount).toBe(1);
		expect(cacheStore.insertKey).toBe('purchases');
		expect(cacheStore.insertValues).toBe(purchases);
	});
})
