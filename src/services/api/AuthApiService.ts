import { AbstractApiService } from "./AbstractApiService";
import { UserData, SignInData, SignUpData } from "models/auth";

class AuthApiService extends AbstractApiService {
    private tokenKey = "jwtToken"

    /**
     * Метод входа в систему
     * @param credentials Данные для входа
     */
    public async signIn(credentials: SignInData): Promise<UserData> {
        return await this.post("sign_in", credentials);
    }

    /**
     * Метод регистрации в системе
     * @param credentials Данные регистрации
     */
    public async signUp(credentials: SignUpData): Promise<any> {
        return await this.post("sign_up", credentials);
    }

    /**
     * Метод выхода из системы
     */
    public async signOut(): Promise<void> {
        return await this.post("sign_out", {}, this.tokenKey);
    }

    /**
     * Метод для хранения токена
     * @param token Токен
     */
    public storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token)
    }

    /**
     * Метод получения токена
     */
    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    /**
     * Метод удаления токена
     */
    public removeToken(): void {
        localStorage.removeItem(this.tokenKey)
    }

    /**
     * Метод для проверки аутентифицорованности
     */
    public isAuthenticated(): boolean {
        return !!this.getToken()
    }
}

export const AuthApi = new AuthApiService("/api/account/")
