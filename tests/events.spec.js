import { test } from '../fixtures/apiFixtures.js' ////.. will go up two levels
import { eventPayload, updatePayload, id } from '../data/events.js'
import { validateResponse, validateStatus,validateId } from '../utils/responseValidator.js'
import { EventApi } from '../api-classes/EventApi.js';

test.describe.serial('My test Event suite', () => {  //It will run the wrapped test written inside in serial
    let eventId;
    console.log("========== TEST 1 in Events==========");
    //availableSeats is automatically set equal to totalSeats
    test("Create an event", { tag: '@smoke' }, async ({ eventApi }) => {
        const response = await eventApi.eventPost("/events", eventPayload);
        validateStatus(response, 201);  //function call
        const responseBody = await validateResponse(response, {
            message: "Event created successfully",
            validateSeats: true
        });
        eventId = responseBody.data.id;
        console.log("Event extracted ", eventId);
    });

    test("Delete an event@smoke", { tag: '@smoke' }, async ({ eventApi }) => {
        console.log("========== TEST 2 in Events ==========");
        console.log("eventID extracted ", eventId);
        const response = await eventApi.eventDelete(`/events/${eventId}`);
        validateStatus(response, 200);
    })

});

test("List all events", async ({ eventApi }) => {
    console.log("========== TEST 3 in Events ==========");
    const response = await eventApi.eventGet("/events");
    validateStatus(response, 200);
});

test("Get a single event ID", { tag: ['@smoke', '@regression'] }, async ({ eventApi }) => {
    console.log("========== TEST 4 in Events ==========");
    const response = await eventApi.eventGet(`/events/${id}`);
    validateStatus(response, 200);
    await validateId(response, id);
});

test("Update an event", { tag: ['@smoke', '@regression'] }, async ({ eventApi }) => {
    console.log("========== TEST 5 in Events ==========");
    const response = await eventApi.eventPut(`/events/${id}`,updatePayload);
    validateStatus(response, 200);
})

