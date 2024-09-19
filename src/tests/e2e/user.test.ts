import { expect, test } from "@playwright/test";
import { UserPage } from "../../user";

test('Add a New User @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1995', 'Male');

   await userPage.expectUserToExist('Vlad Fedash', '1995', 'Male');
});

test('Add User with Missing Name @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('', '1995', 'Male');
   await userPage.expectErrorMessage('Name is requried');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('');
});

test('Add User with Missing Year of Birth @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '', 'Male');
   await userPage.expectErrorMessage('Year of Birth is requried');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('Vlad Fedash');
});

test('Add User with Valid Year of Birth (Lower Boundary) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1900', 'Male');

   await userPage.expectUserToExist('Vlad Fedash', '1900', 'Male');
});

test('Add User with Invalid Year of Birth (Lower Boundary) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1899', 'Male');
   await userPage.expectErrorMessage('Not valid Year of Birth is set');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('Vlad Fedash');
});

// bug here
test.skip('Add User with Valid Year of Birth (Upper Boundary) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '2006', 'Male');

   await userPage.expectUserToExist('Vlad Fedash', '2006', 'Male');
});

test('Add User with Invalid Year of Birth (Negative Value) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '-2000', 'Male');
   await userPage.expectErrorMessage('Not valid Year of Birth is set');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('Vlad Fedash');
});

test('Add User with Missing Gender @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1995', '');

   await userPage.expectUserToExist('Vlad Fedash', '1995', 'Undefined');
});

test('Add User with Short Name (Numbers) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('12', '1995', 'Male');
   await userPage.expectErrorMessage('Name is too short');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('12');
});

test('AAdd User with Short Name (Alphabet) @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('h', '1995', 'Male');
   await userPage.expectErrorMessage('Name is too short');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('h');
});

test('Add User with Spaces in Name Input @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('    ', '1995', 'Male');
   await userPage.expectErrorMessage('Name is requried');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('    ');
});

// bug here
test.skip('Add User with Spaces and Data in Name Input @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('    g', '1995', 'Male');
   await userPage.expectErrorMessage('Name is requried');

   await userPage.goToUsersPage();
   await userPage.expectUserNotToExist('    g');
});


test('Add Duplicate User @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1995', 'Male');
   await userPage.addUser('Vlad Fedash', '1995', 'Male');

   expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');
});

test('Edit an Existing User @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1995', 'Male');
   await userPage.editUser('Vlad Fedash', '1990');

   await userPage.expectUserToExist('Vlad Fedash', '1990', 'Male');
});

test('Delete an Existing User @desktop', async ({ page }) => {
   const userPage = new UserPage(page);
   await userPage.goToUsersPage();
   await userPage.addUser('Vlad Fedash', '1995', 'Male');
   await userPage.deleteUser('Vlad Fedash');

   expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/');
   await userPage.expectUserNotToExist('Vlad Fedash');
});
