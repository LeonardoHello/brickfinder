import { createRouteHandler, createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { z } from "zod";

import { isObject } from "@/utils/isObject";

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return {
      message: err.message,
      reason:
        isObject(err.cause) && typeof err.cause.error === "string"
          ? err.cause.error
          : null,
    };
  },
});

export const uploadRouter = {
  document: f({
    pdf: {
      maxFileSize: "64MB",
      maxFileCount: 1,
      contentDisposition: "inline",
    },
  }).onUploadComplete((data) => {
    return data.file;
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
  config: { logLevel: "debug" },
});
