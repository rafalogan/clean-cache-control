export interface CacheStore {
	delete: (key: string) => void;
	insert: (keys: string) => void;
}
