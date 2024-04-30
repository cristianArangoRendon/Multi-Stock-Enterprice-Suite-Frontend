import { MatExpansionModule } from '@angular/material/expansion';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgChartsModule } from 'ng2-charts';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './_layout/common/sidebar/sidebar.component';
import { FooterComponent } from './_layout/common/footer/footer.component';
import { HeaderComponent } from './_layout/common/header/header.component';
import { NotFoundComponent } from './_layout/common/not-found/not-found.component';
import { InternalErrorComponent } from './_layout/common/internal-error/internal-error.component';
import { CustomizerSettingsComponent } from './_layout/customizer-settings/customizer-settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from "./presentation/pages/private/login/login.component";
import { ConfigService } from './infrastructure/services/Config/ConfigService';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent,
        NotFoundComponent,
        InternalErrorComponent,
        CustomizerSettingsComponent
    ],
    providers: [
        DatePipe,
        ConfigService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatDividerModule,
        NgScrollbarModule,
        MatExpansionModule,
        MatMenuModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        NgxGaugeModule,
        NgChartsModule,
        NgxMatTimepickerModule,
        QuillModule.forRoot(),
        ColorPickerModule,
        NgxDropzoneModule,
        LoginComponent,

    ]
})
export class AppModule { }
