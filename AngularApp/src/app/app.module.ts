import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';

import { GridModule } from '@progress/kendo-angular-grid';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { EquipmentModule } from './equipments/equipment.module';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { EditService } from './equipments/edit.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    EquipmentModule,
    BrowserAnimationsModule, 
    GridModule,
    ButtonsModule
  ],
  providers: [
    {
        deps: [HttpClient],
        provide: EditService,
        useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
