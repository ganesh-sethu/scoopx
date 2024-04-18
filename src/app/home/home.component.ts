import { Component, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnDestroy {

  private interval1: any;
  private interval2: any;

  disappear: boolean = false;

  constructor(public cdr: ChangeDetectorRef, private http: HttpClient) {
    const headers = {
      'x-api-key': 'api_8236e69a9b5b',
      'Content-Type': 'application/json',
      'Authorization': 'sk_ff9e07ef7dc60106b2e31727b6a514697095634c9620db6d'
    };
    
    this.http.get('https://restapi.reemo.io/v1/computers', { headers }).subscribe(res => {
      console.log(res);
    });

    this.interval1 = setInterval(() => {
      this.myFunction1();
    }, 20000);

    this.interval2 = setInterval(() => {
      this.myFunction2();
    }, 30000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  myFunction1(): void {
    this.disappear = true;
  }

  myFunction2(): void {
    this.disappear = false;
  }

  mobile: boolean = false;
  tab: boolean = false;

  @HostListener('window:resize', [])
  onResize(): void {
    const width = window.innerWidth;

    if (width < 768) {
      this.mobile = true;
      // this.tab = false;
    }
    // else if (width <= 1024) {
    //   this.mobile = false;
    //   this.tab = true;
    // }
    else {
      this.mobile = false;
      // this.tab = false;
    }

    this.cdr.detectChanges();
  }

}