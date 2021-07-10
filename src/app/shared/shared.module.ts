import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AamComponentsModule } from 'aam-components';
import { NgSelectModule } from './dropdown/ng-select.module';
import { ToggleButtonComponent } from './toggle/toggle-button.component';
import { AamUploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    ToggleButtonComponent,
    AamUploadComponent,
  ],
  
  exports: [
    ToggleButtonComponent,
    NgSelectModule,
    AamUploadComponent, 

  ],

  imports: [
    CommonModule,
    AamComponentsModule,
    NgSelectModule
  ]
})
export class SharedModule { }
