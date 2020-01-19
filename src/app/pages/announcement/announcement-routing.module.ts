import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnouncementListComponent } from "./announcement-list/announcement-list.component";
import { AddAnnouncementComponent } from "./add-announcement/add-announcement.component";

const routes: Routes = [
  {
    path: "",
    component: AnnouncementListComponent
  },
  {
    path: "add-announcement/:id",
    component: AddAnnouncementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
