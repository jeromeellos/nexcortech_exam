import { NgModule } from '@angular/core';
import { EquipmentListComponent } from './equipment-list.component';
import { RouterModule } from '@angular/router';
import { EquipmentService } from './equipment.service';
import { SharedModule } from './../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { EquipmentActivityComponent } from './equipment-activity.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'equipments', component: EquipmentListComponent },
    ]),
    SharedModule,
    BrowserAnimationsModule,
    GridModule,
  ],
  declarations: [
    EquipmentListComponent,
    EquipmentActivityComponent
  ],
  providers: [
    EquipmentService
  ]
})
export class EquipmentModule { }
