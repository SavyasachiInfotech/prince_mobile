import { HttpHeaders } from "@angular/common/http";

export class Config {
  public apiBaseUrl = "http://13.126.140.244:3000/api/";
  public clientBaseUrl = "http://13.126.140.244:3000/";
  public imageUrl = "http://13.126.140.244:3000/list-image/";
  public thumbnailUrl = "http://13.126.140.244:3000/thumbnail/";
  public categoryUrl = "http://13.126.140.244:3000/category/";
  public bannerUrl = "http://13.126.140.244:3000/banners/";
  public returnBaseUrl = "http://13.126.140.244:3000/return/";
  public appPath = "http://13.126.140.244:3000";

  public invoiceLink =
    "https://sandbox.zippingxpress.com/Shipment/PrintLable?id=";

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
