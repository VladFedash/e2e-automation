import { Page } from "@playwright/test";
import { BasePage } from "../base/basePage";

export class DeleteUserPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    get deleteConfirmationButton() {
        return this.page.getByTestId('button-Yes');
    }
}