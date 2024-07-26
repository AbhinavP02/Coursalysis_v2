import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  getAllProducts,
} from "../service/product.service";

//will just have body of the product in req input
export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });
  return res.send(product);
};

//will just have body of the product in req input
export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const update = req.body;

  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
};

//will just have the product_id in req input
export const getProductHandler = async (
  req: Request<ReadProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await getAllProducts();

  if (!product) {
    //product exists or not
    return res.sendStatus(404);
  }

  return res.send(product);
};

//will just have the product_id in req input

export const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    //product exists or not
    return res.sendStatus(404);
  }
  if (String(product.user) !== userId) {
    // make sure the user that created the product is the one to delete it
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
};
