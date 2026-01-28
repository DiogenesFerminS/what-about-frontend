"use server"
import { UsersService } from "@/services/users.service"

export const getUsersByTermAction = async (term: string) => {
    const response = await UsersService.getUserByTerm(term);
    return response;
}