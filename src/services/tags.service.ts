import { HttpClient } from "./http-client";

export class TagsService {
  static getCountTagsByName(name: string) {
    const response = HttpClient.punchEndPoint<undefined, number>({
      method: 'GET',
      url: `/tags/${name}`
    })

    return response;
  }
}