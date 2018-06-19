import { Component, OnInit } from '@angular/core';

import { IEquipment } from './equipment';
import { EquipmentService } from './equipment.service';

@Component({
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
    pageTitle: string = 'Equipment List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredEquipments = this.listFilter ? this.performFilter(this.listFilter) : this.equipments;
    }

    filteredEquipments: IEquipment[];
    equipments: IEquipment[] = [];

    constructor(private _equipmentService: EquipmentService) {

    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Equipment List: ' + message;
    }

    performFilter(filterBy: string): IEquipment[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.equipments.filter((equipment: IEquipment) =>
              equipment.equipmentName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._equipmentService.getEquipments()
                .subscribe(equipments => {
                    this.equipments = equipments.d;
                    this.filteredEquipments = this.equipments;
                },
                    error => this.errorMessage = <any>error);
    }
}
