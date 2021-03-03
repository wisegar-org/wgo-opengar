import { Router, registerRouterController, RouterApp } from './router';
import _ from 'lodash'

export interface BaseRouter {
    /**
     *
     */
    router: Router
    path: string
    instance: BaseRouter
    regeisterRouter: Function
}