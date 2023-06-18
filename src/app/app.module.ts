import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './components/includes/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { PipeModule } from './pipe/pipe.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonModule } from './shared/skeleton/skeleton.module';
import { SuggestMovieComponent } from './components/suggest-movie/suggest-movie.component';
import { MatButtonToggleModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    HomeComponent,
    FooterComponent,
    SuggestMovieComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PipeModule,
    CarouselModule,
    SidebarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SkeletonModule,MatFormFieldModule, MatSelectModule, MatInputModule,MatButtonToggleModule,MatGridListModule,
    BrowserAnimationsModule,NoopAnimationsModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
