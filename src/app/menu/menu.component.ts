import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChansonService } from '../modeles/chanson.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, OnDestroy {
  personnage: string;
  sub: Subscription;
  routeSub: Subscription;
  isCollapsed = true;

  constructor(private chansonService: ChansonService, private router: Router) {
    this.sub = this.chansonService.getSelectedPersonnage().subscribe(p => {
      console.log(p);
      this.personnage = p;
      if (p === 'Kirouac'){
        this.router.navigateByUrl('menu/chapitres');
      } else if (p === 'Kodak') {
        this.router.navigateByUrl('menu/saisons');
      } else {
        this.router.navigateByUrl('/');
      }

    });
    this.routeSub = router.events.subscribe((val: NavigationEnd) => {
      if (val.url === '/menu' ){
        router.navigateByUrl('/');
      }
    });
  }

  ngOnChanges(): void{
    this.isCollapsed = true;
    if (this.personnage === 'Kirouac'){
      this.router.navigateByUrl('menu/chapitres');
    } else {
      this.router.navigateByUrl('menu/saisons');
    }
    this.isCollapsed = true;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
