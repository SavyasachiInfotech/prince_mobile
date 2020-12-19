import { HttpHeaders } from "@angular/common/http";

export class Config {
  public apiBaseUrl = "http://45.80.152.224:3000/api/";
  public clientBaseUrl = "http://45.80.152.224:3000/";
  public imageUrl = "http://45.80.152.224:3000/list-image/";
  public thumbnailUrl = "http://45.80.152.224:3000/thumbnail/";
  public categoryUrl = "http://45.80.152.224:3000/category/";
  public bannerUrl = "http://45.80.152.224:3000/banners/";
  public returnBaseUrl = "http://45.80.152.224:3000/return/";
  public appPath = "http://45.80.152.224:3000";

  public invoiceLink =
    "https://accounts.zippingxpress.com/Shipment/PrintLable?id=";

  // public appPath = "http://localhost:4200";
  // public apiBaseUrl = "http://localhost:3000/api/";
  // public clientBaseUrl = "http://localhost:3000/";
  // public imageUrl = "http://localhost:3000/list-image/";
  // public thumbnailUrl = "http://localhost:3000/thumbnail/";
  // public categoryUrl = "http://localhost:3000/category/";
  // public bannerUrl = "http://localhost:3000/banners/";
  // public returnBaseUrl = "http://localhost:3000/return/";
  public displayLimit = 10;
  public err = "No response found from server. Please try again later.";

  getHeader(): any {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    let options = { headers: headers };
    return options;
  }

  showMessage(message) {
    alert(message);
  }

  public orderStatus = {
    "0": "Recieved Orders",
    "1": "Confirmed Order",
    "2": "Dispatched Order",
    "4": "Delivered Order",
    "7": "Cancelled Order"
  };
}
