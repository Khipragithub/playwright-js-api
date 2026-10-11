import { expect } from '@playwright/test'
import { test } from '../fixtures/apiFixtures.js' ////.. will go up two levels
import { BASE_URL } from '../config/env.js'
import { validateStatus } from '../utils/responseValidator.js';

test("Api health check up", async ({apiLoggedIn})=>{
    const response = await apiLoggedIn.get(`${BASE_URL}/health`);
    validateStatus(response,200);
});