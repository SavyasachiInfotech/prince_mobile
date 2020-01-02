import { Component, OnInit } from "@angular/core";
import { SpecificationService } from "src/app/core/mock/specification.service";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-manage-specification",
  templateUrl: "./manage-specification.component.html",
  styleUrls: ["./manage-specification.component.scss"]
})
export class ManageSpecificationComponent implements OnInit {
  public specifications = new Array();
  constructor(
    private _specificationService: SpecificationService,
    private _config: Config
  ) {}

  ngOnInit() {
    this._specificationService.getAllSpecifications().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        //@ts-ignore
        this.specifications = res.data;
      } else {
        //@ts-ignore
        this._config.showMessage(res.message);
      }
    });
  }
}
