import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/core/mock/mobile.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  public allBrand=new Array();

  constructor(private _mobileService:MobileService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands(){
    this._mobileService.getBrand().subscribe(res=>{
      //@ts-ignore
      if(res.status=200){
        //@ts-ignore
        this.allBrand=res.data;
      }
    });
  }
  

  addBrand(){
    let name=prompt("Add Brand Name","");
    if(name!=null){
      this._mobileService.addBrand({name:name}).subscribe(res=>{
        //@ts-ignore
        if(res.status==200){
          //@ts-ignore
          this.allBrand=res.data;
        } else {
          //@ts-ignore
          alert(res.message);
        }
      });
    }
  }

  updateBrand(brand){
    let name=prompt("Update Brand Name",brand.name);
    if(name!=null){
      this._mobileService.updateBrand({id:brand.brand_id,name:name}).subscribe(res=>{
        //@ts-ignore
        if(res.status==200){
          //@ts-ignore
          this.allBrand=res.data;
        } else {
          //@ts-ignore
          alert(res.message);
        }
      });
    }
  }

}
