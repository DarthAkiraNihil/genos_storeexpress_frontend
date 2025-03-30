
export abstract class AbstractApiService {
    protected baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    protected get(path: string): any {

        return fetch(`${this.baseUrl}/${path}`)
            .then(
                (response) => {
                    let json =  response.json()
                    
                    if ((response.status !== 200) && (response.status !== 201) && (response.status !== 204)) {
                        json.then(
                            (val) => {
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

    protected post(path: string, data: any): any {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then(
                (response) => {
                    let json =  response.json()
                    
                    if ((response.status !== 200) && (response.status !== 201) && (response.status !== 204)) {
                        json.then(
                            (val) => {
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

}