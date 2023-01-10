import { Router } from 'express';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuhtenticateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/createDeliveryman/CreateDeliverynabController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuhtenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindallAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/deliveries/FindAllDeliveriesDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndAt/UpdateEndDateController';

const routes = Router();

//Controllers
//Create Client
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

//DeliveryMan
//CreateDeliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

//CreateDelivery
const createDeliveryController = new CreateDeliveryController();
//FindAllAvailables
const findAllAvailableController = new FindallAvailableController();
const updateDeliveryController = new UpdateDeliverymanController();
//FindAllDeliveriesClient
const findAllDeliveriesController = new FindAllDeliveriesController();
//FindAllDeliveriesDeliveryman
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

const updateEndDateController = new UpdateEndDateController();

routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.post(
  '/deliveryman/authenticate/',
  authenticateDeliverymanController.handle
);
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle
);

routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routes.put(
  '/delivery/updateDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliveryController.handle
);

routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);
routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

routes.put(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);
export { routes };
