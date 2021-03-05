"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpCall = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/* typed fetch */
// export interface HttpCallResponse<T> extends Response {
//   parseBody?: T;
// }
async function httpCall(request, requestInit) {
    const response = await node_fetch_1.default(request, requestInit);
    return response;
}
exports.httpCall = httpCall;
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
