import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { User } from "@/interfaces/common/user-interface";

export class UsersService {

  static async getUser(): Promise<ServiceResponse<User>> {
    return HttpClient.punchEndPoint<undefined, User>({
      url: "/users/profile",
      method: "GET",
      nextOptions: { cache: "no-store" }
    });
  }

  static async getUserById(id: string): Promise<ServiceResponse<User>> {
    return HttpClient.punchEndPoint<undefined, User>({
      url: `/users/${id}`,
      method: "GET",
      nextOptions: { cache: "no-store" }
    });
  }

  static async getUserByTerm(term: string): Promise<ServiceResponse<User[]>> {
    return HttpClient.punchEndPoint<undefined, User[]>({
      url: "/users/get",
      method: "GET",
      params: { term },
      nextOptions: { cache: "no-store" }
    });
  }

  static async updateProfileUser(data: FormData): Promise<ServiceResponse<User>> {
    return HttpClient.punchEndPoint<FormData, User>({
      url: "/users/update-profile",
      method: "PATCH",
      body: data,
      isFormData: true
    });
  }
}
