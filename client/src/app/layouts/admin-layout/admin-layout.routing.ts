import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProgramaComponent } from "../../pages/programa/programa.component";
import { ProdutoComponent } from "../../pages/produto/produto.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "programas", component: ProgramaComponent },
  { path: "produtos", component: ProdutoComponent },
];
