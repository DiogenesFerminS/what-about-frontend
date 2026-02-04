import { HttpClient } from "./http-client";

export class TagsService {
  static getCountTagsByName(name: string) {
    const response = HttpClient.punchEndPoint<undefined, number>({
      method: 'GET',
      url: `/tags/${name}`
    })

    return response;
  }

  static getTagsTrending() {
    const response = HttpClient.punchEndPoint<undefined, {id: string, name: string, count: number}[]>({
      method: 'GET',
      url: `/tags/trending`,
    });

    return response;
  }
}