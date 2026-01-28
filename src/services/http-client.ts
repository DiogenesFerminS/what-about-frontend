import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Props<T> {
  url: string;
  method: HttpMethod;
  body?: T;
  params?: Record<string, string | number | boolean | undefined>;
  isPublic?: boolean;
  isFormData?: boolean;
  nextOptions?: RequestInit;
}

export class HttpClient {
  
  private static async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    return token;
  }
  static async punchEndPoint<T, R>({
    body,
    method,
    url,
    params,
    isPublic = false,
    isFormData = false,
    nextOptions = {},
  }: Props<T>): Promise<ServiceResponse<R>> {
    
    const urlObj = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {};
    
    if (!isPublic) {
      const token = await this.getToken();
      if (!token) {
        return { success: false, statusCode: 401, error: "Unauthorized: No token found" };
      }
      headers["Cookie"] = `auth-token=${token}`;
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const resp = await fetch(urlObj.toString(), {
        method,
        headers,
        body: method === "GET" ? undefined : (isFormData ? (body as FormData) : JSON.stringify(body)),
        ...nextOptions,
      });

      const response = await resp.json();

      if (!resp.ok){
        return {
            statusCode: response.status,
            success: false,
            error: response.error
        }
      }

      return {
        statusCode: response.status,
        success: true,
        data: response.data
      }

    } catch (error) {
      console.error(`[PunchEndPoint Error] ${method} ${url}:`, error);
      return {
        statusCode: 503,
        error: error instanceof Error ? error.message : "Connection failed",
        success: false,
      };
    }
  }
}