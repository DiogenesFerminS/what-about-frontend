"use server"

import { UsersService } from "@/services/users.service";

export const updateUserAction = async(data: FormData) => {
    const userService = new UsersService();
    const response = await userService.updateProfileUser(data);
    return response;
};