import { MediaListGroup } from "./MediaListGroup";
import { User } from "./User";

export interface MediaListCollection {
    lists: MediaListGroup[],
    user: User

}