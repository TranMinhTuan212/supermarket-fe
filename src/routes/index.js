import { pages } from "~/config";
import DefaultLayout from "~/layouts/defaultLayout/defauluLayout";
import LoginLayout from "~/layouts/loginLayout";
import Add from "~/pages/add";
import Detail from "~/pages/detail";
import Home from "~/pages/home";
import ListProductAdmin from "~/pages/list-produc-admin";
import Login from "~/pages/login";
import Password from "~/pages/password";
import Register from "~/pages/register";



export const publicRoutes = [
    {
        path: pages.home, layout: DefaultLayout, page: Home
    },
    {
        path: pages.add, layout: DefaultLayout, page: Add
    },
    {
        path: pages.login, layout: LoginLayout, page: Login
    },
    {
        path: pages.listProductAdmin, layout: DefaultLayout, page: ListProductAdmin
    },
    {
        path: pages.detail, layout: DefaultLayout, page: Detail
    },
    {
        path: pages.register, layout: DefaultLayout, page: Register
    },
    {
        path: pages.password, layout: DefaultLayout, page: Password
    }
]