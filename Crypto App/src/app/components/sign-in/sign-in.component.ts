import { Component, OnInit } from '@angular/core'; 
import { ApiServiceService } from '../../service/api-service.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  

  coinData:any = [];
  

  constructor( private httpService: ApiServiceService,private router: Router) { }
  
  
  ngOnInit() {
    
    this.getData();

    
    setInterval(()=>{
      this.getData();
    },10000);
  }
  
 
  getData() {
    let params = '';
    this.httpService.get('/api/getcoin',params).subscribe(res => {
      if (res) {
          this.coinData = res.data;           
      }else{
          this.coinData = [];           
      }
    },error=>{
        this.coinData = [];
    })
  }

 
  setData(item){
    this.router.navigate(['card', { name: item.name, price: item.quote.USD.price.toFixed(6)}], { skipLocationChange: true });
  }
}
