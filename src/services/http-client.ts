import { ServiceResponse } from "@/interfaces/common/service-response.interface";
import { cookies } from "next/headers";
import { refreshToken } from "./refresh/refresh";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Props<T> {
  url: string;
  method: HttpMethod;
  body?: T;
  params?: Record<string, string | number | boolean | undefined>;
  isPublic?: boolean;
  isFormData?: boolean;
  nextOptions?: RequestInit;
  headers?: Record<string, string>
}

export class HttpClient {
  
  static async punchEndPoint<T, R>({
    body,
    method,
    url,
    params,
    isPublic = false,
    isFormData = false,
    nextOptions = {},
    headers = {},
  }: Props<T>): Promise<ServiceResponse<R>> {
    const urlObj = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }
    
    let cookieStore = await cookies();
    if (!isPublic) {
      headers["Cookie"] = cookieStore.toString();
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    try {
      let resp = await fetch(urlObj.toString(), {
        method,
        headers,
        body: method === "GET" ? undefined : (isFormData ? (body as FormData) : JSON.stringify(body)),
        ...nextOptions,
      });

      if (resp.status === 401) {
        const refreshed = await refreshToken();

        if(!refreshed) {
          return {
            statusCode: 401,
            success: false,
            error: 'Expired token'
          }
        }

        cookieStore = await cookies();
        headers["Cookie"] = cookieStore.toString();


        resp = await fetch(urlObj.toString(), {
          method,
          headers,
          body: method === "GET" ? undefined : (isFormData ? (body as FormData) : JSON.stringify(body)),
        ...nextOptions,
        })
      }

      const response = await resp.json();

      if (!resp.ok){
        return {
            statusCode: resp.status,
            success: false,
            error: response.error
        }
      }

      return {
        statusCode: resp.status,
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