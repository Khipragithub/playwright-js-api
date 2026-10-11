import { BASE_URL } from "../config/env.js";

class EventApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async eventGet(endPointUrl) {
        const response = await this.apiContext.get(`${BASE_URL}${endPointUrl}`);
        return response;
    }

    async eventPost(endPointUrl, eventPayload) {
        const response = await this.apiContext.post(`${BASE_URL}${endPointUrl}`,
            {
                data: eventPayload
            });
        return response;
    }
    
async eventPut(endPOintUrl,updatePayload){
    const response = await this.apiContext.put(`${BASE_URL}${endPOintUrl}`,
        {
            data: updatePayload
        });
        return response;
}

    async eventDelete(endPointUrl) {
        const response = await this.apiContext.delete(`${BASE_URL}${endPointUrl}`);
        return response;
    }

};

export { EventApi };