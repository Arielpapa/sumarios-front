import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AamComponentsModule, AamModalComponent } from 'aam-components'
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AamCoreModule, ApiRestService } from 'aam-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';


const projectConfig = {
  env: (environment.production) ? 'prod' : 'dev',
  company: 'sumarios-front',
  imagesPath: environment.imagesPath,
  baseUrl: environment.baseUrl
};

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    AamCoreModule.forRoot(projectConfig),
    BrowserModule,
    AppRoutingModule,
    AamComponentsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    //FormsModule,
    //NgxChartsModule,

  ],
  providers: [ApiRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
