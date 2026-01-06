import { cookies } from "next/headers";

export class UsersService {
  static async getUser() {
    const cookieStore = await cookies();
      const token = cookieStore.get("auth-token")?.value;
    
      if (!token) {
        console.log("Server: Cookie 'auth-token' not found");
        return null;
      }
    
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
          method: 'GET',
          headers: {
            "Cookie": `auth-token=${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store"
        });
    
        const data = await resp.json();
    
        if (!resp.ok) {
          return null;
        }
        return data.data;
        
      } catch (error) {
        console.error("Error conectando al backend:", error);
        return null;
      }
  }
}