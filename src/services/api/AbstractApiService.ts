/**
 * Класс абстрактного API
 */
export abstract class AbstractApiService {
    protected baseUrl: string

    /**
     * Стандартный конструктор
     * @param baseUrl Базовая часть URL, с которого будут начинаться запросы
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    /**
     * Отлов ошибки в промисе
     * @param promise промис
     * @param waitForFile Если установлен, то при успешном ответе инициирует получение файла
     * @private
     */
    private async handleError(promise: Promise<any>, waitForFile: boolean = false): Promise<any> {
        return await promise.then(
            (response) => {

                if (response.status === 204) {
                    return response;
                }

                if (waitForFile) {
                    console.log("is file");
                    return response.blob().then((blob: any) => {

                        const header = response.headers.get('Content-Disposition');
                        const parts = header!.split(';');
                        const filename = parts[1].split('=')[1];

                        const fileURL = window.URL.createObjectURL(blob);
                        let alink = document.createElement("a");
                        alink.href = fileURL;
                        alink.download = filename
                        alink.click();

                    });
                }

                let json =  response.json()
                
                if ((response.status !== 200) && (response.status !== 201) && (response.status !== 204)) {
                    json.then(
                        (val: any) => {
                            alert(JSON.stringify(val));
                        }
                    )
                } 
                
                return json;
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        );
    }

    /**
     * Получение заголовков для запроса
     * @param token Токен
     * @private
     */
    private getHeaders(token: string): Headers {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token}`)
        }
        return requestHeaders;
    }

    /**
     * Отправка GET-запроса
     * @param path Путь запроса (добавится в базовую часть)
     * @param token Токен
     * @param waitForFile Если установлен, то при успешном ответе инициирует получение файла
     * @protected
     */
    protected async get(path: string, token: string = "", waitForFile: boolean = false): Promise<any> {

        if (token) {
            return await this.handleError(
                fetch(`${this.baseUrl}/${path}`, {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    },
                }), waitForFile
            )
        }

        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`)
        )
    }

    /**
     * Отправка POST-запроса
     * @param path Путь запроса (добавится в базовую часть)
     * @param token Токен
     * @param data Отправляемые данные
     * @protected
     */
    protected async post(path: string, data: any, token: string = ""): Promise<any> {
        if (data instanceof FormData) {
            return await this.handleError(
                fetch(`${this.baseUrl}/${path}`, {
                    method: "POST",
                    headers: { ...this.getHeaders(token), contentType: "multipart/form-data" },
                    body: data,
                })
            )
        }
        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "POST",
                headers: this.getHeaders(token),
                body: (data instanceof FormData) ? data : JSON.stringify(data),
            })
        )
    }

    /**
     * Отправка PUT-запроса
     * @param path Путь запроса (добавится в базовую часть)
     * @param token Токен
     * @param data Отправляемые данные
     * @protected
     */
    protected async put(path: string, data: any, token: string = ""): Promise<any> {
        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "PUT",
                headers: this.getHeaders(token),
                body: JSON.stringify(data),
            })
        )
    }

    /**
     * Отправка DELETE-запроса
     * @param path Путь запроса (добавится в базовую часть)
     * @param token Токен
     * @protected
     */
    protected async delete(path: string, token: string = ""): Promise<any> {
        if (token) {
            return await this.handleError(
                fetch(`${this.baseUrl}/${path}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            )
        }

        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "DELETE",
            })
        )

    }

}