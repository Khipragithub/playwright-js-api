import { expect } from '@playwright/test'
import { test } from '../fixtures/apiFixtures.js' ////.. will go up two levels
import { BASE_URL } from '../config/env'
import { bookingPayload, bookRef } from '../data/events.js';
import { validateStatus, validateResponse, validateId, validateBookingRef } from '../utils/responseValidator.js';

test.describe.serial("My test Booking suite", () => {
    let bookingId;
    console.log("========== TEST 1 in Bookings==========");
    test("Create a bookings", async ({ apiLoggedIn }) => {
        const response = await apiLoggedIn.post(BASE_URL + "/bookings",
            {
                data: bookingPayload
            }
        )
        validateStatus(response, 201);
        expect(response.status()).toBe(201);
        const responseBody = await validateResponse(response, {
            message: "Booking confirmed!"
        })
        bookingId = responseBody.data.id
        console.log("Booking extracted ", bookingId);
    });

    test("Get a single booking by id", async ({ apiLoggedIn }) => {
        console.log("========== TEST 2 in Bookings==========");
        const response = await apiLoggedIn.get(`${BASE_URL}/bookings/${bookingId}`);
        validateStatus(response, 200);
        await validateId(response, bookingId)
    });

    test("Delete a booking", async ({ apiLoggedIn }) => {
        console.log("========== TEST 3 in Bookings==========");
        const response = await apiLoggedIn.delete(`${BASE_URL}/bookings/${bookingId}`);
        validateStatus(response, 200);
        const responseBody = await validateResponse(response, {
            message: "Booking cancelled"
        });
    });

});

test("List all bookings", async ({ apiLoggedIn }) => {
    console.log("========== TEST 4 in Bookings==========");
    const response = await apiLoggedIn.get(BASE_URL + "/bookings");
    validateStatus(response, 200);
});

test("Retrieves a booking using the unique booking reference", async ({ apiLoggedIn }) => {
    console.log("========== TEST 5 in Bookings==========");
    const response = await apiLoggedIn.get(`${BASE_URL}/bookings/ref/${bookRef}`);
    validateStatus(response, 200);
    await validateBookingRef(response, bookRef)
});

