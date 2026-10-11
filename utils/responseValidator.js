import { expect } from '@playwright/test';

export function validateStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
}

export function validateEqual(actual, expected) {
    expect(actual).toBe(expected);
}

export async function validateResponse(response, expected) {
    const responseBody = await response.json(); //recomonded to store the body and then use it because
    //calling response.json() multiple times cause error because you shouldn't try to parse the same response body 
    //again and again
    if (responseBody.message !== undefined) {
        expect(responseBody.message).toBe(expected.message);
    }
    if (expected.validateSeats) {
        validateEqual(responseBody.data.availableSeats, responseBody.data.totalSeats);
    }
    return responseBody
}

export async function validateId(response, expectedId) {
    const responseBody = await response.json();
    expect(responseBody.data.id).toBe(expectedId);
}

export async function validateBookingRef(response,expectedBookingRef){
    const responseBody = await response.json();
    expect(responseBody.data.bookingRef).toBe(expectedBookingRef);
}
