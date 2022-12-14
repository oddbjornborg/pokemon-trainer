import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginRedirectGuard } from "./guards/login-redirect.guard";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LandingPage } from "./pages/landing/landing.page";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { SummaryPage } from "./pages/summary/summary.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: LandingPage,
        canActivate: [ LoginRedirectGuard ]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [ LoginRedirectGuard ]
    },
    {
        path: "login",
        component: LoginPage,
        canActivate: [ LoginRedirectGuard ]
    },
    {
        path: "trainer",
        component: TrainerPage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "catalogue",
        component: CataloguePage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "summary",
        component: SummaryPage,
        canActivate: [ AuthGuard ]
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