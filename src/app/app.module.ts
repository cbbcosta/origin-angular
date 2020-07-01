import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InstallmentsFormComponent } from './components/installments-form/installments-form.component';
import {FormsModule} from '@angular/forms';
import {InputMaskService} from './services/input-mask.service';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';

@NgModule({
  declarations: [
    AppComponent,
    InstallmentsFormComponent,
    SubmitButtonComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule
  ],
  providers: [InputMaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
