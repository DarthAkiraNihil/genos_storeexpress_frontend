
export abstract class AbstractApiService {
    protected baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    /**
     * name
     */
    protected get(path: string): any {

        return fetch(`${this.baseUrl}/${path}`)
            .then((response) => response.json())
            .catch((error) => {
                throw Error(error)
            });
    }

}