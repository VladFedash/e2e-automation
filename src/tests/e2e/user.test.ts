import { expect, test } from "@playwright/test";

test('Add a New User @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '1995');
    await page.selectOption('select[id="selectGender"]', 'Male');

    await page.click('text=Create');

    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText('1995');
    await expect(userRow).toContainText('Male');
});

test('Add User with Missing Name @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputYearOfBirth"]', '1995');
    await page.selectOption('select[id="selectGender"]', 'Male');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Name is requried');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = ""]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with Missing year of birth @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.selectOption('select[id="selectGender"]', 'Male');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Year of Birth is requried');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with valid year of birth(lover border) @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '1900');

    await page.click('text=Create');

    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).toBeVisible();
});

// bug here
test('Add User with valid year of birth(higher border) @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '2006');

    await page.click('text=Create');

    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).toBeVisible();
});

test('Add User with invalid year of birth(lover border) @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '1899');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Not valid Year of Birth is set');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with invalid year of birth(higher border) @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '2007');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Not valid Year of Birth is set');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with invalid year of birth(negative value) @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '-2000');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Not valid Year of Birth is set');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});


test('Add User with Missing Gender @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '1995');

    await page.click('text=Create');

    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText('Undefined');
});

test('Add User with short name: numbers @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', '12');
    await page.fill('input[id="inputYearOfBirth"]', '1995');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Name is too short');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "12"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with short name: alpabhet @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'h');
    await page.fill('input[id="inputYearOfBirth"]', '1995');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Name is too short');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "h"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add User with spaces in name input @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', '    ');
    await page.fill('input[id="inputYearOfBirth"]', '1995');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Name is requried');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "    "]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

// bug here
test('Add User with spaces and data in name input @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', '    g');
    await page.fill('input[id="inputYearOfBirth"]', '1995');

    await page.click('text=Create');

    const errorMessage = await page.locator('text=Name is requried');
    await expect(errorMessage).toBeVisible();
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');

    await page.goto('https://traineeautomation.azurewebsites.net/');
    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "    g"]//parent::tr');
    await expect(userRow).not.toBeVisible();
});

test('Add Duplicate User @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    await page.click('text=Add User');

    await page.fill('input[id="inputUserName"]', 'Vlad Fedash');
    await page.fill('input[id="inputYearOfBirth"]', '1995');
    await page.selectOption('select[id="selectGender"]', 'Male');

    await page.click('text=Create');
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/Forms/AddUser');
});

test('Edit an Existing User @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    const userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');

    const editButton = userRow.getByTestId('button-Edit');
    await editButton.click();

    await page.fill('input[id="inputYearOfBirth"]', '1990');

    await page.click('text=Update');

    await expect(userRow).toContainText('1990');
    
});

test('Delete an Existing User @desktop', async ({ page }) => {
    await page.goto('https://traineeautomation.azurewebsites.net/');

    let userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');

    const deleteButton = userRow.getByTestId('button-Delete');
    await deleteButton.click();

    await page.click('text=Yes');
    expect(await page.url()).toBe('https://traineeautomation.azurewebsites.net/');

    userRow = await page.locator('//td[@data-testid = "td-UserName"][normalize-space(text()) = "Vlad Fedash"]//parent::tr');

    await expect(userRow).not.toBeVisible();
});
