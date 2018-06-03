import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../../interfaces/IEntity';
import { AlbumService } from '../../service/album.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  newRelease: IAlbum[];
  albums: IAlbum[];
  totalOfAlbums: number = 0;
  type: number;
  term: string = '';
  surfix: string;
  content: any;
  constructor(
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params.content)
      console.log(params.type)
      this.content = params.content;
      this.type = params.type;
      // if (this.type == 0)
      //   this.surfix = 'Search > ' + this.content
      this.albumService.getPageForSection(0, this.type, this.content);
      this.albumService.pageSubject.subscribe(page => {
        this.albums = page.content;
        // if(this.albums.length > 0){
        // if (this.type == 1)
        // this.surfix = '> ' + this.albums[0].artist.name
        // if (this.type == 2)
        // this.surfix = '> ' + this.albums[0].genre
        // if (this.type == 3)
        // this.surfix = '> ' + this.albums[0].artist.name
        // if (this.type == 4)
        // this.surfix = '> ' + this.albums[0].artist.name 
        // }
        this.totalOfAlbums = page.totalElements;
      })
    });
    this.albumService.getPageNewRelease(0, 10).subscribe(data => {
      this.newRelease = data.content
    },
      error => {
        console.log(error)
      })
  }
  onPaginateChange(event: PageEvent) {
    this.albumService.getPageForSection(event.pageIndex, this.type, this.content)
  }
  ngOnInit() {
  }
  toSearchResult() {
    this.router.navigate(['/section', { type: 0, content: this.term }]);
  }
  getLink() {
    // let surfix = '';
    // if (this.type == 0)
    //   surfix = 'search/' + con
    // if (this.type == 1)
    //   this.getPageArtist(page, Constant.SECTION_SIZE, content);
    // if (this.type == 2)
    //   this.getPageGenre(page, Constant.SECTION_SIZE, content);
    // if (this.type == 3)
    //   this.getPageByCountry(page, Constant.SECTION_SIZE, content);
    // if (this.type == 4)
    //   this.getPage(page, Constant.SECTION_SIZE);
    // return 'Home / ' + 
  }
}
