import { expect, Page } from '@playwright/test';

export class UserPage {
   readonly page: Page;

   constructor(page: Page) {
       this.page = page;
   }

   async goToUsersPage() {
       await this.page.goto('https://traineeautomation.azurewebsites.net/');
   }

   async addUser(name: string, yearOfBirth: string, gender: string) {
       await this.page.click('text=Add User');
       await this.page.waitForTimeout(300);

       if (name != '') {
           await this.page.fill('input[id="inputUserName"]', name);
       }

       if (yearOfBirth != '') {
           await this.page.fill('input[id="inputYearOfBirth"]', yearOfBirth);
       }

       if (gender) {
           await this.page.selectOption('select[id="selectGender"]', gender);
       }

       await this.page.click('text=Create');
   }

   async editUser(name: string, newYearOfBirth: string) {
       const userRow = this.page.locator(`//td[@data-testid = "td-UserName"][normalize-space(text()) = "${name}"]//parent::tr`);
       const editButton = userRow.getByTestId('button-Edit');
       await editButton.click();
       await this.page.fill('input[id="inputYearOfBirth"]', newYearOfBirth);
       await this.page.click('text=Update');
   }

   async deleteUser(name: string) {
       const userRow = this.page.locator(`//td[@data-testid = "td-UserName"][normalize-space(text()) = "${name}"]//parent::tr`);
       const deleteButton = userRow.getByTestId('button-Delete');
       await deleteButton.click();
       await this.page.click('text=Yes');
   }

   async expectUserToExist(name: string, yearOfBirth: string, gender: string) {
       const userRow = this.page.locator(`//td[@data-testid = "td-UserName"][normalize-space(text()) = "${name}"]//parent::tr`);
       await expect(userRow).toBeVisible();
       await expect(userRow).toContainText(yearOfBirth);
       await expect(userRow).toContainText(gender);
   }

   async expectUserNotToExist(name: string) {
       const userRow = this.page.locator(`//td[@data-testid = "td-UserName"][normalize-space(text()) = "${name}"]//parent::tr`);
       await expect(userRow).not.toBeVisible();
   }

   async expectErrorMessage(message: string) {
       const errorMessage = this.page.locator(`text=${message}`);
       await expect(errorMessage).toBeVisible();
       expect(await this.page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');
   }
}
