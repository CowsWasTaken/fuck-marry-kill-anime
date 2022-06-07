import {Schema} from "./schema";

export const environment : Schema= {
  production: true,
  CLIENT_ID: process.env.NG_APP_CLIENT_ID
};
