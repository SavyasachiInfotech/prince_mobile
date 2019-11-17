import { HttpHeaders } from "@angular/common/http";

export class Config {
  public apiBaseUrl = "http://localhost:3000/api/";
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
