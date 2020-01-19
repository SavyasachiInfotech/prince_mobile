import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AnnouncementRoutingModule } from "./announcement-routing.module";
import { AnnouncementListComponent } from "./announcement-list/announcement-list.component";
import { AddAnnouncementComponent } from "./add-announcement/add-announcement.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AnnouncementListComponent, AddAnnouncementComponent],
  imports: [CommonModule, AnnouncementRoutingModule, FormsModule]
})
export class AnnouncementModule {}
