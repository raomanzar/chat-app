import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
import { prisma } from "../utils/db.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [expo()],
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "client://",
    ...(process.env.NODE_ENV === "development"
      ? [
          "exp://",
          "exp://**",
          "exp://192.168.*.*:*/**",
          "http://localhost:8081",
        ]
      : []),
  ],
  debug: process.env.NODE_ENV !== "production",
});
