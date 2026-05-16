import type { NextFunction, Request, Response, RequestHandler } from "express";

type AsyncController<
  Params = unknown,
  ResponseBody = unknown,
  RequestBody = unknown,
  RequestQuery = unknown,
> = (
  req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
  res: Response<ResponseBody>,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler =
  <
    Params = unknown,
    ResponseBody = unknown,
    RequestBody = unknown,
    RequestQuery = unknown,
  >(
    controller: AsyncController<
      Params,
      ResponseBody,
      RequestBody,
      RequestQuery
    >,
  ): RequestHandler<Params, ResponseBody, RequestBody, RequestQuery> =>
  (req, res, next): void => {
    void Promise.resolve(controller(req, res, next)).catch(next);
  };
