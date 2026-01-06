import { Pagination } from "@/interfaces/common/pagination.interface";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { OpinionData } from "@/interfaces/opinions/opinionData.interface";
import { cookies } from "next/headers";

export class OpinionsService {
  static async getAllOpinions({limit, page}: Pagination): Promise<ServiceResponse<OpinionData>> {
    const token = await this.getToken();

    if(!token) {
        return {
          success:false,
          statusCode: 401,
          error: "Unauthorized user "
        }
    }

    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions?limit=${limit}&page=${page}`, {
          method: 'GET',
          headers: {
            "Cookie": `auth-token=${token}`,
            "Content-Type": "application/json",
          },
        //   next: {revalidate: 300},
        cache: "no-store"
        });

        const res:{MessageChannel: string, ok: boolean, data: OpinionData} = await resp.json();
        return {
            success: true,
            statusCode: 200,
            data: res.data
        }
    } catch (error) {
        console.error("Connection failed:", error);

        return {
            statusCode: 503,
            error: "Connection failed",
            success: false,
        }
    }
    
  }

  private static async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
    
  }
}