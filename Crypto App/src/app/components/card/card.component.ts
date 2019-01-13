import { Component, OnInit } from '@angular/core'; 
import { ApiServiceService } from '../../service/api-service.service'; 
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
 
  name:any = "";
  price:any= "";
 
  constructor( private httpService: ApiServiceService,private route: ActivatedRoute,private router: Router) { 
    
    let params: any = this.route.snapshot.params;
    
    this.name = params.name;
    this.price = params.price;
  }
  
  ngOnInit() {
  }
}
