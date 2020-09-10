import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss']
})
export class TabsNavComponent implements OnInit {
  rootUrl = '/';
  navLinks: any[] = [
    {
      name: 'Overview',
      link: ''
    },
    {
      name: 'Stocks',
      links: '/stocks'
    }
  ];

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  }

}
