import { RouterApp, registerRouterController, Response, Request } from '../routes/router'
import { AuthController } from '../controllers/AuthController'
import Container from 'typedi'


const authController  = Container.get(AuthController)
RouterApp.get('/', (req: Request, res: Response) => res.send('Auth Paths'))

RouterApp.post('/login', (req: Request, res: Response) => authController.loginUser(req, res))

RouterApp.post('/registerCustomer', (req: Request, res: Response) => authController.registerCustomer(req, res))

RouterApp.post('/updateCustomer', (req: Request, res: Response) => authController.updateCustomerProfile(req, res))

RouterApp.post('/checkPasswordStrength', (req: Request, res: Response) => authController.checkPasswordStrength(req, res))

RouterApp.post('/checkEmailConfirmation', (req: Request, res: Response) => authController.checkEmailConfirmation(req, res))

RouterApp.post('/resendEmailConfirmation', (req: Request, res: Response) => authController.resendEmailConfirmation(req, res))

registerRouterController('/auth', RouterApp);