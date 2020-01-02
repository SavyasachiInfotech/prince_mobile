import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/core/data/config";
import { SpecificationService } from "src/app/core/mock/specification.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-specification",
  templateUrl: "./add-specification.component.html",
  styleUrls: ["./add-specification.component.scss"]
})
export class AddSpecificationComponent implements OnInit {
  public specification: any = {};
  private id: number = 0;
  constructor(
    private _config: Config,
    private _specificationService: SpecificationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this._route.params.subscribe(data => {
      this.id = data.id;
      if (this.id != 0) {
        this._specificationService.getSpecificationById(this.id).subscribe(
          res => {
            //@ts-ignore
            if (res.status == 200) {
              //@ts-ignore
              if (res.data.length > 0) {
                //@ts-ignore
                this.specification.key = res.data[0].specification_key;
                //@ts-ignore
                this.specification.value = res.data[0].specification_value;
              } else {
              }
            } else {
              //@ts-ignore
              this._config.showMessage(res.message);
            }
          },
          err => {
            this._config.showMessage("Please check internet connection");
          }
        );
      }
    });
  }

  saveSpecification() {
    if (this.specification.key != "") {
      if (this.specification.value != "") {
        if (this.id == 0) {
          this._specificationService
            .addSpecification(this.specification)
            .subscribe(
              res => {
                //@ts-ignore
                this._config.showMessage(res.message);
                //@ts-ignore
                if (res.status == 200) {
                  this._router.navigate([
                    "dashboard/specifications/manage-specifications"
                  ]);
                }
              },
              err => {
                this._config.showMessage("Please check internet connection");
              }
            );
        } else {
          let specification = this.specification;
          specification.id = this.id;
          this._specificationService
            .updateSpecification(specification)
            .subscribe(
              res => {
                //@ts-ignore
                this._config.showMessage(res.message);
                //@ts-ignore
                if (res.status == 200) {
                  this._router.navigate([
                    "dashboard/specifications/manage-specifications"
                  ]);
                }
              },
              err => {
                this._config.showMessage("Please check internet connection");
              }
            );
        }
      } else {
        this._config.showMessage("Please enter specification value");
      }
    } else {
      this._config.showMessage("Please enter specification key");
    }
  }

  cancelSpecification() {
    this.specification.key = "";
    this.specification.value = "";
  }
}
