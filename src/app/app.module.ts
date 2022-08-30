import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LandingPage } from './pages/landing/landing.page';
import { RegisterPage } from './pages/register/register.page';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PokemonTeamListComponent } from './components/pokemon-team-list/pokemon-team-list.component';
import { PokemonTeamItemComponent } from './components/pokemon-team-item/pokemon-team-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrainerComponent } from './components/trainer/trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TrainerPage,
    CataloguePage,
    LoginFormComponent,
    LandingPage,
    RegisterPage,
    PokemonItemComponent,
    PokemonListComponent,
    RegisterFormComponent,
    PokemonTeamListComponent,
    PokemonTeamItemComponent,
    NavbarComponent,
    TrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
