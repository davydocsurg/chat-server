export class UserStatusStore {
    private static instance: UserStatusStore;
    private userStatuses: Record<string, boolean>;

    private constructor() {
        this.userStatuses = {};
    }

    public static getInstance(): UserStatusStore {
        if (!UserStatusStore.instance) {
            UserStatusStore.instance = new UserStatusStore();
        }
        return UserStatusStore.instance;
    }

    setUserOnline(userId: string) {
        this.userStatuses[userId] = true;
    }

    setUserOffline(userId: string) {
        this.userStatuses[userId] = false;
    }

    isUserOnline(userId: string): boolean {
        return !!this.userStatuses[userId];
    }
}
