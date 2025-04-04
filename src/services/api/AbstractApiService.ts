
export abstract class AbstractApiService {
    protected baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private async handleError(promise: Promise<any>): Promise<any> {
        return await promise.then(
            (response) => {

                if (response.status === 204) {
                    return response;
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
                throw new Error(error);
            }
        );
    }

    protected async get(path: string): Promise<any> {

        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`)
        )
    }

    protected async post(path: string, data: any): Promise<any> {
        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
        )
    }

    protected async put(path: string, data: any): Promise<any> {
        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
        )
    }

    protected async delete(path: string): Promise<any> {
        return await this.handleError(
            fetch(`${this.baseUrl}/${path}`, {
                method: "DELETE",
            })
        )
    }

}