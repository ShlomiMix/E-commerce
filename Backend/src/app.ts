import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import { appConfig } from "./2-utils/app-config";
import { dal } from "./2-utils/dal";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { authRouter } from "./6-controllers/auth-controller";
import { categoriesRouter } from "./6-controllers/categories-controller";
import { clothingSizesRouter } from "./6-controllers/clothingSizes-controller";
import { colorsRouter } from "./6-controllers/colors-controller";
import { companiesRouter } from "./6-controllers/companies-controller";
import { peopleAudienceRouter } from "./6-controllers/peopleAudience-controller";
import { productsRouter } from "./6-controllers/products-controller";
import { shoesSizesRouter } from "./6-controllers/shoesSizes-controller";
import { subCategoriesRouter } from "./6-controllers/subCategories-controller";
import { accessoriesSizesRouter } from "./6-controllers/accessoriesSizes-controller";
import { orderRouter } from "./6-controllers/orders-controller";

// Main application class:
class App {
  // Express server:
  private server = express();

  // Start app:
  public async start(): Promise<void> {
    // Enable CORS requests:
    this.server.use(cors()); // Enable CORS for any frontend website.

    // Create a request.body containing the given json from the front:
    this.server.use(express.json());

    // Create request.files containing uploaded files:
    this.server.use(expressFileUpload());

    // Configure images folder:
    // fileSaver.config(path.join(__dirname, "1-assets", "images"));

    // Register middleware:
    this.server.use(loggerMiddleware.logToConsole);

    // Connect any controller route to the server:
    this.server.use(
      "/api",
      categoriesRouter,
      accessoriesSizesRouter,
      clothingSizesRouter,
      colorsRouter,
      companiesRouter,
      peopleAudienceRouter,
      shoesSizesRouter,
      authRouter,
      subCategoriesRouter,
      productsRouter,
      orderRouter
    );

    // Route not found middleware:
    this.server.use(errorsMiddleware.routeNotFound);

    // Catch all middleware:
    this.server.use(errorsMiddleware.catchAll);

    // connect to MongoDB
    await dal.connect();

    // run server
    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port)
    );
  }
}

const app = new App();
app.start();
