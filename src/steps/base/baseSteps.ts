import { Page } from "@playwright/test";

export class BaseSteps {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}
