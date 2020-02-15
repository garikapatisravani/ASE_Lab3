import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Nutrition } from '../Nutrition';
declare const responsiveVoice: any;

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  searchString: string;
  nutritionObj: Nutrition;
  constructor(private http: HttpClient, private localStorageService: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/login']);
  }

  getFoodDetails(searchString) {
    this.nutritionObj;
      let url: string = 'https://api.nutritionix.com/v1_1/search/' + this.searchString + '?results=0:1&fields=*&appId=9316e68c&appKey=%2021f516ff993899c6fad07c6d309d6845';
      this.http.get<Nutrition>(url)
        .subscribe((resp) => {
          this.nutritionObj = resp;
          if(resp){
            responsiveVoice.speak('The Weight of ' + this.searchString + ' is ' + this.nutritionObj.hits[0].fields.nf_serving_weight_grams);
            responsiveVoice.speak('The Calories of ' + this.searchString + ' is ' + this.nutritionObj.hits[0].fields.nf_calories);
          }
         
        });


  }

}
