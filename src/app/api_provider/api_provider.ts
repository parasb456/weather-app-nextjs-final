import { Result, RootObject } from "../interfaces/interfaces";

export class ApiProvider {
  public static async getAllCities(
    limit: number,
    remove: number,
    queryString: string
  ): Promise<Result[]> {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}${queryString}`;

    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "csrftoken=GPINEC3DogKy4JydVmEiAG79b3jdoeotaiM9zzzcub1NRQcinHE21N2tc8Wj4s2g"
    );

    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    return new Promise<any>(
      (resolve: (data: any) => void, reject: (error: any) => void): void => {
        fetch(url, requestOptions)
          .then((response) => {
            return response.json().then((res) => {
              if (!response.ok) {
                reject({
                  status: response.status ? response.status.toString() : "",
                  message:
                    (res.error.message && res.error.message.value) ||
                    "Request Failed",
                });
              } else {
                let results: Result[] = [];

                for (let i = remove; i < limit; i++) {
                  results.push(res.results[i]);
                }
                resolve(results);
              }
            });
          })
          .catch((error) => console.log("error", error));
      }
    );
  }
}
