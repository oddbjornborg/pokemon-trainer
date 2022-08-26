import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LandingPage } from "./pages/landing/landing.page";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: LandingPage
    },
    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "trainer",
        component: TrainerPage
    },
    {
        path: "catalogue",
        component: CataloguePage
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ 
        RouterModule 
    ]
})
export class AppRoutingModule {
    
}