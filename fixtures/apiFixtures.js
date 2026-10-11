
import { test as base, expect, request } from '@playwright/test';
import { BASE_URL } from '../config/env.js';
import { loginPayload } from '../data/users.js';
import { EventApi } from '../api-classes/EventApi.js';

export const test = base.extend({
    apiLoggedIn: async ({}, use) => {
        const logincontext = await request.newContext();

        try {
            const response = await logincontext.post(
                `${BASE_URL}/auth/login`,
                { data: loginPayload }
            );

            expect(response.ok()).toBeTruthy();

            const responseBody = await response.json();
            const token = responseBody.token;

            const apicontext = await request.newContext({
                extraHTTPHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            try {
                await use(apicontext);
            } finally {
                await apicontext.dispose();
            }

        } finally {
            await logincontext.dispose();
        }
    },

    eventApi: async ({ apiLoggedIn }, use) => {
        const event = new EventApi(apiLoggedIn);
        await use(event);
    }
});
