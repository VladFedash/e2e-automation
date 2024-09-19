import { Page } from '@playwright/test';
import { BasePage } from './base/basePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    // Ask developers to create data-testid
    get addUserButton() {
        return this.page.locator('text=Add User');
    }

    get editButton() {
        return this.page.getByTestId('button-Edit');
    }

    get deleteButton() {
        return this.page.getByTestId('button-Delete');
    }

    async findUserRow(name: string) {
        return this.page.locator(`//td[@data-testid = "td-UserName"][normalize-space(text()) = "${name}"]//parent::tr`);
    }
}
