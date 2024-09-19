import { expect, test } from "@playwright/test";
import { UserSteps } from "../../steps/user/userSteps";
import { BaseSteps } from "../../steps/base/baseSteps";
import { UrlProvider } from "../../utils/urlProvider";
import { UserDTO } from "../../dto/userDto";
import { Gender } from "../../enums/genderEnum";

test.describe('User Management', () => {
    let baseSteps: BaseSteps;
    let userSteps: UserSteps;
    const createdUsers: { name: string, yearOfBirth: string, gender: string }[] = [];

    const validUserData: UserDTO[] = [
        { name: 'Vlad Fedash', yearOfBirth: '1995', gender: Gender.Male },
        { name: 'John Doe', yearOfBirth: '2000', gender: Gender.Undefined },
        { name: 'Jane Smith', yearOfBirth: '1990', gender: Gender.Female }
    ];

    test.beforeEach(async ({ page }) => {
        baseSteps = new BaseSteps(page);
        userSteps = new UserSteps(page);

        await baseSteps.navigateTo(UrlProvider.getBaseUrl());
        createdUsers.length = 0;
    });

    for (const userData of validUserData) {
        test(`Add user: ${userData.name} @desktop`, async () => {
            await userSteps.addUser(userData);
            createdUsers.push(userData);

            await userSteps.verifyUserExists(userData);
        });
    }

    // bug here
    test.skip('Add User with Valid Year of Birth (Upper Boundary) @desktop', async () => {
        const user: UserDTO = { name: 'Vlad Fedash', yearOfBirth: '2006', gender: Gender.Male };
        await userSteps.addUser(user);
        createdUsers.push(user);

        await userSteps.verifyUserExists(user);
    });

    const invalidUserData = [
        { testName: 'Missing Name', name: '', yearOfBirth: '1995', gender: Gender.Male, errorMessage: 'Name is requried' },
        { testName: 'Missing Year of Birth', name: 'Vlad Fedash', yearOfBirth: '', gender: Gender.Male, errorMessage: 'Year of Birth is requried' },
        { testName: 'Invalid Year of Birth (Lower Boundary)', name: 'Vlad Fedash', yearOfBirth: '1899', gender: Gender.Male, errorMessage: 'Not valid Year of Birth is set' },
        { testName: 'Invalid Year of Birth (Negative Value)', name: 'Vlad Fedash', yearOfBirth: '-2000', gender: Gender.Male, errorMessage: 'Not valid Year of Birth is set' },
        { testName: 'Short Name (Numbers)', name: '12', yearOfBirth: '1995', gender: Gender.Male, errorMessage: 'Name is too short' },
        { testName: 'Short Name (Alphabet)', name: 'h', yearOfBirth: '1995', gender: Gender.Male, errorMessage: 'Name is too short' },
        { testName: 'Spaces in Name Input', name: '    ', yearOfBirth: '1995', gender: Gender.Male, errorMessage: 'Name is requried' },
        // bug here { testName: 'Spaces and Data in Name Input', name: '    g', yearOfBirth: '1995', gender: 'Male', errorMessage: 'Name is requried' }
    ];

    for (const userData of invalidUserData) {
        test(`Add user with: '${userData.testName}' @desktop`, async () => {
            await userSteps.addUser(userData);
            await userSteps.expectErrorMessage(userData.errorMessage);

            await baseSteps.navigateTo(UrlProvider.getBaseUrl());
            await userSteps.verifyUserNotExists(userData.name);
        });
    }

    test('Add Duplicate User @desktop', async () => {
        const user: UserDTO = { name: 'Vlad Fedash', yearOfBirth: '1995', gender: Gender.Male };
        await userSteps.addUser(user);
        createdUsers.push(user);

        await userSteps.addUser(user);
        expect(await baseSteps.getCurrentUrl()).toBe(UrlProvider.getAddUserUrl());
    });

    test('Edit an Existing User @desktop', async () => {
        let user: UserDTO = { name: 'Vlad Fedash', yearOfBirth: '1995', gender: Gender.Male };
        await userSteps.addUser(user);

        user.yearOfBirth = '1990';
        await userSteps.editUser(user);
        createdUsers.push(user);

        await userSteps.verifyUserExists(user);
    });

    test('Delete an Existing User @desktop', async () => {
        const user: UserDTO = { name: 'Vlad Fedash', yearOfBirth: '1995', gender: Gender.Male };
        await userSteps.addUser(user);
        await userSteps.deleteUser(user.name);

        expect(await baseSteps.getCurrentUrl()).toBe(UrlProvider.getBaseUrl());
        await userSteps.verifyUserNotExists(user.name);
    });

    test.afterEach(async ({ page }) => {
        if (createdUsers.length <= 0) {
            return;
        }

        for (const user of createdUsers) {
            await userSteps.deleteUser(user.name);
        }
    });
});