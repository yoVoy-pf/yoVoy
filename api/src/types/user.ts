import { Ticket } from "../models/Ticket";

export interface iUser {
    name : string;
    password : string;
    email? : string;
    refreshToken? : string;
    ticket? : Ticket
    rolesId?: number[];
  }
