import {Genre} from './genre'
import {Artist} from './artist'
export class Album {
    id: number;
    name: string;
    price: number;
    genre: Genre;
    artist: Artist;
    releasedate: number;
    cover: string
}
