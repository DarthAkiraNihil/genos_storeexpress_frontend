import { AbstractApiService } from "./AbstractApiService";
import { UserData, SignInData } from "models/auth";

class AuthApiService extends AbstractApiService {
    private tokenKey = "jwtToken"

    public async signIn(credentials: SignInData): Promise<UserData> {
        return await this.post("sign_in", credentials);
    }

    public async signOut(): Promise<void> {
        return await this.post("sign_out", {});
    }

    public storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token)
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    public removeToken(): void {
        console.log("removing token");
        localStorage.removeItem(this.tokenKey)
    }

    public isAuthenticated(): boolean {
        return !!this.getToken()
    }
}

export const AuthApi = new AuthApiService("/api/account/")
