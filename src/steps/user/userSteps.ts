import { Page } from "playwright";
import { expect } from "playwright/test";
import { AddUserPage } from "../../pages/user/addUserPage";
import { BaseSteps } from "../base/baseSteps";
import { DeleteUserPage } from "../../pages/user/deleteUserPage";
import { EditUserPage } from "../../pages/user/editUserPage";
import { HomePage } from "../../pages/homePage";
import { UrlProvider } from "../../utils/urlProvider";
import { UserDTO } from "../../dto/userDto";

export class UserSteps extends BaseSteps {
    private readonly addUserPage: AddUserPage;
    private readonly homePage: HomePage;
    private readonly editUserPage: EditUserPage;
    private readonly deleteUserPage: DeleteUserPage;

    constructor(page: Page) {
        super(page);
        this.addUserPage = new AddUserPage(page);
        this.homePage = new HomePage(page);
        this.editUserPage = new EditUserPage(page);
        this.deleteUserPage = new DeleteUserPage(page);
    }

    async addUser(user: UserDTO) {
        await this.homePage.addUserButton.click();
        await this.page.waitForTimeout(300);

        if (user.name) await this.addUserPage.userNameInput.fill(user.name);
        if (user.yearOfBirth) await this.addUserPage.yearOfBirthInput.fill(user.yearOfBirth);
        if (user.gender) await this.addUserPage.genderDropdown.selectOption(user.gender);

        await this.addUserPage.createButton.click();
    }

    async editUser(user: UserDTO) {
        const userRow = await this.homePage.findUserRow(user.name);
        await userRow.locator(this.homePage.editButton).click();
        await this.editUserPage.userNameInput.fill(user.name);
        await this.editUserPage.yearOfBirthInput.fill(user.yearOfBirth);
        await this.editUserPage.genderDropdown.selectOption(user.gender);

        await this.editUserPage.updateButton.click();
    }

    async deleteUser(name: string) {
        await this.navigateTo(UrlProvider.getBaseUrl());

        const userRow = await this.homePage.findUserRow(name);
        await userRow.getByTestId('button-Delete').click();
        await this.deleteUserPage.deleteConfirmationButton.click();
    }

    async expectErrorMessage(message: string) {
        const errorMessage = this.page.locator(`text=${message}`);
        await expect(errorMessage).toBeVisible();
        expect(await this.getCurrentUrl()).toBe(UrlProvider.getAddUserUrl());
    }

    async verifyUserExists(user: UserDTO) {
        const userRow = await this.homePage.findUserRow(user.name);
        await expect(userRow).toBeVisible();
        await expect(userRow).toContainText(user.yearOfBirth);
        await expect(userRow).toContainText(user.gender);
    }

    async verifyUserNotExists(name: string) {
        const userRow = await this.homePage.findUserRow(name);
        await expect(userRow).not.toBeVisible();
    }
}
