import { DataTableModule, DialogModule, ButtonModule, DropdownModule, CalendarModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    CalendarModule,
    DropdownModule,
    ButtonModule,
    BrowserAnimationsModule,
    DataTableModule,
    DialogModule,
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
