"use server"
import { UsersService } from "@/services/users.service"

export const getUsersByTermAction = async (term: string) => {
    const usersService = new UsersService();
    const response = await usersService.getUserByTerm(term);
    return response;
}