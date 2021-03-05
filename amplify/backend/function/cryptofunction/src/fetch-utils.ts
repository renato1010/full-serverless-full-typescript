import fetch, {
  RequestInfo,
  RequestInit,
  Response as FetchResponse,
} from "node-fetch";

/* typed fetch */
// export interface HttpCallResponse<T> extends Response {
//   parseBody?: T;
// }

export async function httpCall(
  request: RequestInfo,
  requestInit?: RequestInit
): Promise<FetchResponse> {
  const response: FetchResponse = await fetch(request, requestInit);
  return response;
}
// implementation
// export const fetchSuggestedLocations = async (
//   AccessToken: string,
//   location: string
// ): Promise<SuggestedLocation[] | undefined> => {
//   console.log('Fetch Suggested Locations');
//   const headers = new Headers();
//   headers.append('Authorization', `Bearer ${AccessToken}`);
//   const suggestsPath = '/suggestedLocations/';
//   const url = encodeURI(`${hotelBaseUrl}${suggestsPath}${location}`);
//   const suggestionsResponse = await httpCall<SuggestedLocation[]>(url, { headers });
//   if (suggestionsResponse.ok) {
//     return suggestionsResponse.parseBody;
//   } else {
//     throw new Error('Error fetching location suggestions');
//   }
// };
