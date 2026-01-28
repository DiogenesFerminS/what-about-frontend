"use server"

import { UsersService } from "@/services/users.service";

export const updateUserAction = async(data: FormData) => {
    const response = await UsersService.updateProfileUser(data);
    return response;
};