import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAlbum, IGenre, IArtist, ISong, ICountry } from '../interfaces/IEntity'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { Constant } from '../utils/constant'
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AlbumService {
  public pageSubject = new BehaviorSubject<any>([]);
  public albums: IAlbum[];
  token: string;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.userInfo.subscribe(data => {
      if (data)
        this.token = data.token;
      console.log(data)
    })
  }

  getPageForSection(page: number, type: number, content: any) {
    console.log(type)
    if (type == 0)
      this.getPageOnSearching(page, Constant.SECTION_SIZE, content);
    if (type == 1)
      this.getPageArtist(page, Constant.SECTION_SIZE, content);
    if (type == 2)
      this.getPageGenre(page, Constant.SECTION_SIZE, content);
    if (type == 3)
      this.getPageByCountry(page, Constant.SECTION_SIZE, content);
    if (type == 4)
      this.getPage(page, Constant.SECTION_SIZE);
  }
  //4
  getPage(page: number, pageSize: number) {
    console.log('new')
    this.http.get<any>(Constant.SERVER + 'album/page' + '?page=' + page + '&pagesize=' + pageSize).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.albums = data.content;
    })
  }
  //0
  getPageOnSearching(page: number, pageSize: number, term: string) {
    console.log('search')
    this.http.get<any>(Constant.SERVER + 'album/client/search' + '?page=' + page + '&pagesize=' + pageSize + '&term=' + term).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.albums = data.content;
    })
  }
  //1
  getPageArtist(page: number, pageSize: number, id: number) {
    console.log('artist')
    this.http.get<any>(Constant.SERVER + 'album/client/searchartist' + '?page=' + page + '&pagesize=' + pageSize + '&id=' + id).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.albums = data.content;
    })
  }
  //2
  getPageGenre(page: number, pageSize: number, id: number) {
    console.log('genre')
    this.http.get<any>(Constant.SERVER + 'album/client/searchgenre' + '?page=' + page + '&pagesize=' + pageSize + '&id=' + id).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.albums = data.content;
    })
  }
  //3
  getPageByCountry(page: number, pageSize: number, country: string) {
    console.log('country')
    this.http.get<any>(Constant.SERVER + 'album/client/searchcountry' + '?page=' + page + '&pagesize=' + pageSize + '&country=' + country).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.albums = data.content;
    })
  }


  getPageNewRelease(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(Constant.SERVER + 'album/page' + '?page=' + page + '&pagesize=' + pageSize)
  }
  getPageByArtist(page: number, pageSize: number, id: number): Observable<any> {
    return this.http.get<any>(Constant.SERVER + 'album/client/searchartist' + '?page=' + page + '&pagesize=' + pageSize + '&id=' + id)
  }
  getAllGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(Constant.SERVER + 'genre/all')
  }
  getAllCountries(): Observable<ICountry[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.get<ICountry[]>(Constant.SERVER + 'country/all', httpOptions)
  }
  addArtist(artist: IArtist): Observable<IArtist> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.post<IArtist>(Constant.SERVER + 'artist', artist, httpOptions)
  }
  getAllArtists(): Observable<IArtist[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.get<IArtist[]>(Constant.SERVER + 'artist/all', httpOptions)
  }
  getById(id: number): Observable<IAlbum> {
    return this.http.get<IAlbum>(Constant.SERVER + 'album/client/' + id)
  }
  getNewReleaseCountry(page: number, pageSize: number, country: string): Observable<any> {
    return this.http.get<any>(Constant.SERVER + 'album/client/searchcountry' + '?page=' + page + '&pagesize=' + pageSize + '&country=' + country)
  }
  edit(item: IAlbum) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    this.http.put<IAlbum>(Constant.SERVER + 'album/edit', item, httpOptions).subscribe(data => {
      let index = this.albums.findIndex(album => album.id === data.id);
      this.albums[index] = data;
      let temp: any = this.pageSubject.getValue()
      temp.content = this.albums
      this.pageSubject.next(temp)
      console.log(data)
      this.dialog.closeAll();
    },
      error => {
        console.log(error);
      }
    )
    // this.http.put<IAlbum>(Constant.SERVER + 'album/edit', item, httpOptions).subscribe ( data => {
    //   let index = this.albums.findIndex( album => album.id === data.id);
    //   this.albums[index] = data;
    //   let temp : any = this.pageSubject.getValue()
    //   temp.content = this.albums
    //   this.pageSubject.next(temp)
    //   console.log(data)
    // })
  }
  remove(item: IAlbum) {
    this.albums = this.albums.filter(book => book !== item)
    let temp: any = this.pageSubject.getValue()
    temp.content = this.albums
    this.pageSubject.next(temp)
  }
  add(item: IAlbum) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    console.log(item)
    this.http.post<IAlbum>(Constant.SERVER + 'album', item, httpOptions).subscribe(data => {
      this.dialog.closeAll();
      this.albums.push(data)
      let temp: any = this.pageSubject.getValue()
      temp.content = this.albums
      this.pageSubject.next(temp)
    },
      error => {
        console.log(error);
      }
    )
  }
  deleteSong(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    console.log(id)
    this.http.delete(Constant.SERVER + 'song/' + id, httpOptions).subscribe(
      error => {
        console.log(error);
      }
    )
  }
  addSong(song: ISong): Observable<ISong> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    console.log(song)
    return this.http.post(Constant.SERVER + 'song', song, httpOptions)
  }
  changeAlbumStatus(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    this.http.put<IAlbum>(Constant.SERVER + 'album/changestatus?id=' + id, null, httpOptions).subscribe(data => {
      let index = this.albums.findIndex(album => album.id === data.id);
      this.albums[index] = data;
      let temp: any = this.pageSubject.getValue()
      temp.content = this.albums
      this.pageSubject.next(temp)
      console.log(data)
    },
      error => {
        console.log(error);
      }
    )
  }
}
