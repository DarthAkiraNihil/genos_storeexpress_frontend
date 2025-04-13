import { AbstractApiService } from "./AbstractApiService";
import { UserData, SignInData } from "models/auth";

class AuthApiService extends AbstractApiService {
    private tokenKey = "jwtToken"

    async signIn(credentials: SignInData): Promise<UserData> {
        return await this.post("login", credentials);
    }

    storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token)
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    removeToken(): void {
        localStorage.removeItem(this.tokenKey)
    }

    isAuthenticated(): boolean {
        return !!this.getToken()
    }
}

export const AuthApi = new AuthApiService("/api/cart/account/")
