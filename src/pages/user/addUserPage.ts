import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';

export class AddUserPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    get userNameInput() {
        return this.page.getByTestId('input-UserName');
    }

    get yearOfBirthInput() {
        return this.page.getByTestId('input-YearOfBirth');
    }

    get genderDropdown() {
        return this.page.getByTestId('select-Gender');
    }

    get createButton() {
        return this.page.getByTestId('button-Create');
    }
}
