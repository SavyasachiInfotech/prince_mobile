import { HttpHeaders } from "@angular/common/http";

export class Config {
  public apiBaseUrl =
    "http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/api/";
  public clientBaseUrl =
    "http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/";
  public imageUrl =
    "http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/list-image/";
  public thumbnailUrl =
    "http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/";

  // public apiBaseUrl = "http://localhost:3000/api/";
  // public clientBaseUrl = "http://localhost:3000/";
  // public imageUrl = "http://localhost:3000/list-image/";
  // public thumbnailUrl = "http://localhost:3000/thumbnail/";
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
}
