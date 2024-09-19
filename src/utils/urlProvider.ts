export class UrlProvider {
    private static baseUrl: string = 'https://traineeautomation.azurewebsites.net/';

    static getBaseUrl(): string {
        return this.baseUrl;
    }

    static getHomeUrl(): string {
        return `${this.baseUrl}`;
    }

    static getAddUserUrl(): string {
        return `${this.baseUrl}Forms/AddUser`;
    }

    static getEditUserUrl(userId: string): string {
        return `${this.baseUrl}Forms/EditUser/${userId}`;
    }

    static getUserDetailUrl(userId: string): string {
        return `${this.baseUrl}users/${userId}`;
    }
}
