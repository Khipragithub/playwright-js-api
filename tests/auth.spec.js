import { expect } from '@playwright/test'
import { test } from '../fixtures/apiFixtures.js' ////.. will go up two levels
import { BASE_URL } from '../config/env.js'
import { validateStatus } from '../utils/responseValidator.js';

test("Test API login", async ({apiLoggedIn})=>{
    console.log('API authentication completed');
});

test("Test user identity", async ({apiLoggedIn})=>{
    const response = await apiLoggedIn.get(BASE_URL + "/auth/me");
    validateStatus(response,200);
});