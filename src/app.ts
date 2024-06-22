import express, { Request, Response } from "express";

import { OrderRoutes } from "./app/modules/order/order.router";
import notFound from "./app/middleWare/notfound";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";
import { ProductRoutes } from "./app/modules/product/product.route";

export const app = express();

app.use(express.json());

app.use("/api", ProductRoutes, OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);
