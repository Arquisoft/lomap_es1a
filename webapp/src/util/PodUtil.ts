import type { Friend } from "./UserData";
import { fetch } from "@inrupt/solid-client-authn-browser";
import {
  Thing, getThing,
  getSolidDataset,
  getUrlAll,
  getStringNoLocale
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf"

// Returns a user profile as a Thing
export async function getUserProfile(webID: string) {
    let profile = webID.split("#")[0];
    let dataSet = await getSolidDataset(profile, { fetch: fetch });
    return getThing(dataSet, webID) as Thing;
}

// Returns all friends as a list
export async function getFriends(webId:string) {
  
  let friendURLs = getUrlAll(await getUserProfile(webId), FOAF.knows);
  let friends: Friend[] = [];

  for (let friend of friendURLs) {
    // This solution is very ugly, might need some fixing later...
    if (friend.split("/profile/card").length == 1)
      friend += "profile/card#me";
    
    let name = getStringNoLocale(
      await getUserProfile(friend),
      FOAF.name
    ) as string;

    if (friend && friend != webId)
      friends.push({
        name: name,
        webId : friend.split("profile/card#me")[0]
      });
    
  }
  return friends;
}