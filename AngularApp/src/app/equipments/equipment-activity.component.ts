import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';


import { EquipmentService } from './equipment.service';
import { IActivity } from './iactivity';
import { map } from 'rxjs/operators/map';
import { EditService } from './edit.service';
import { Activity } from './activity';

@Component({
    selector: 'equipment-activity',
    providers: [EquipmentService],
    template: `
    <form novalidate #myForm="ngForm">
      <kendo-grid
          [data]="activities"
          [pageSize]="5"
          [skip]="skip"
          [pageable]="false"
          [scrollable]="'none'"
          (pageChange)="pageChange($event)"
          (dataStateChange)="onStateChange($event)"
          (edit)="editHandler($event)" (cancel)="cancelHandler($event)"
          (save)="saveHandler($event)" (remove)="removeHandler($event)"
          (add)="addHandler($event, myForm)"
          [navigable]="true"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand type="button">Add new</button>
        </ng-template>

      <kendo-grid-column field="equipmentID" title="Equipment ID" width="120"></kendo-grid-column>
      <kendo-grid-column field="activityDate" title="Date" editor="datetime">
        <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.activityDate" kendoGridFocusable name="ActivityDate" class="k-textbox" type="date" required/>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="activity" title="Activity">
        <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.activity" kendoGridFocusable name="activity" class="k-textbox" required/>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="activityComplete" title="Completed?" editor="boolean" >
        <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.activityComplete" kendoGridFocusable name="activityComplete" type="checkbox"  />
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="completedBy" title="Completed By">
        <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.completedBy" kendoGridFocusable name="completedBy" class="k-textbox" required/>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="completedOn" title="Completed On" editor="datetime">
        <ng-template kendoGridEditTemplate let-dataItem="dataItem">
            <input [(ngModel)]="dataItem.completedOn" kendoGridFocusable name="completedOn" class="k-textbox" type="date" required/>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-command-column title="command" width="220">
            <ng-template kendoGridCellTemplate let-isNew="isNew">
                <button kendoGridEditCommand type="button" [primary]="true">Edit</button>
                <button kendoGridRemoveCommand type="button">Remove</button>
                <button
                kendoGridSaveCommand type="button"
                [disabled]="myForm.invalid || myForm.pristine">{{ isNew ? 'Add' : 'Update' }}</button>
                <button kendoGridCancelCommand type="button">{{ isNew ? 'Discard changes' : 'Cancel' }}</button>
            </ng-template>
        </kendo-grid-command-column>
      </kendo-grid>
    </form>
  `
})
export class EquipmentActivityComponent implements OnInit {

    /**
     * The category for which details are displayed
     */
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    @Input() public equipment: Object;
    public activities: IActivity[];
    public errorMessage: string;
    //public view: Observable<GridDataResult>;
    //public skip = 0;
    private editService: EditService;
    private editedRowIndex: number;
    private editedActivity: IActivity;
    
    constructor(private service: EquipmentService, @Inject(EditService) editServiceFactory: any) {
        this.editService = editServiceFactory();
     }

    public ngOnInit(): void {
        //this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        //this.editService.read();

        this.service.getEquipmentActivities(this.equipment)
        .subscribe(activities => {
            this.activities = activities.d;
        },
        error => this.errorMessage = <any>error);
    }

    public onStateChange(state: State) {
        this.gridState = state;

        //this.editService.read();
    }

    public addHandler({sender}, formInstance) {
        formInstance.reset();
        this.closeEditor(sender);

        sender.addRow(new Activity());
    }

    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedActivity = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, dataItem, isNew}) {
        //this.editService.save(dataItem, isNew);

        sender.closeRow(rowIndex);

        this.editedRowIndex = undefined;
        this.editedActivity = undefined;
    }

    public removeHandler({dataItem}) {
        //this.editService.remove(dataItem);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedActivity = undefined;
    }

    // public pageChange({ skip, take }: PageChangeEvent): void {
    //     this.skip = skip;
    //     this.service.queryForCategory(this.category, { skip, take });
    // }
}