import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/core/mock/dashboard.service";
import { Config } from "src/app/core/data/config";
import * as Highcharts from "highcharts";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private _dashboardService: DashboardService,
    private _config: Config
  ) {}
  public dashboardDetail = new Array();

  ngOnInit() {
    this._dashboardService.getDashboardDetail().subscribe(res => {
      //@ts-ignore
      if (res.status == 200) {
        console.log(res);
        //@ts-ignore
        let stockdata = res.dashboardData;
        //@ts-ignore
        this.dashboardDetail = res.countData;
        let data = new Array();
        data.push([stockdata[0].datetime, stockdata[0].total]);
        data = this.addDateBetweenTwoDate(
          stockdata[0].datetime,
          stockdata[1].datetime,
          data
        );
        for (let i = 1; i < stockdata.length - 1; i++) {
          data.push([stockdata[i].datetime, stockdata[i].total]);
          data = this.addDateBetweenTwoDate(
            stockdata[i].datetime,
            stockdata[i + 1].datetime,
            data
          );
        }
        data.push([
          stockdata[stockdata.length - 1].datetime,
          stockdata[stockdata.length - 1].total
        ]);
        //@ts-ignore
        Highcharts.chart("profitDashboard", {
          // title: {
          //   text: null
          // },
          yAxis: {
            title: {
              text: "Amount"
            }
          },
          credits: { enabled: false },
          xAxis: {
            title: {
              text: "Date"
            }
          },
          rangeSelector: {
            selected: 1
          },

          title: {
            text: "Total Selling"
          },

          series: [
            {
              name: "Total Selling",
              data: data,
              //@ts-ignore
              type: "areaspline",
              threshold: null,
              tooltip: {
                valueDecimals: 2
              },
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [
                    1,
                    Highcharts.color(Highcharts.getOptions().colors[0])
                      .setOpacity(0)
                      .get("rgba")
                  ]
                ]
              }
            }
          ]
        });
      }
    });
  }

  addDateBetweenTwoDate(startDate, endDate, data) {
    let stDate: Date = new Date(parseInt(startDate));
    console.log(startDate);
    let eDate: Date = new Date(parseInt(endDate));
    //@ts-ignore
    let diff = Math.ceil((eDate - stDate) / (1000 * 60 * 60 * 24));
    if (diff > 1) {
      for (let i = 0; i < diff - 1; i++) {
        startDate = new Date(startDate).setDate(
          new Date(startDate).getDate() + 1
        );
        startDate = new Date(startDate).getTime();

        data.push([startDate, 0.0]);
      }
    }

    return data;
  }
}
