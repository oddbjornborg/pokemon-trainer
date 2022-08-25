export class StorageUtil {
    public static save<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static read<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        
        try {
            if(storedValue) {
                return JSON.parse(storedValue) as T;
            }
        }
        catch(error) {
            sessionStorage.removeItem(key);
        }
    
        return undefined;
    }

}