export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async createTicket(ticket) {
        return await this.dao.createTicket(ticket);
    }
}