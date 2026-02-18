import { ticketModel } from "./models/ticketModel.js";

export class ticketDBManager {
    async createTicket(ticket) {
        return await ticketModel.create(ticket);
    }
}