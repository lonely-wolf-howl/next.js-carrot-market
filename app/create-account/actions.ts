"use server";

import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPasswordConfirm = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkUsernameIsUnique = async (username: string) => {
  const isExist = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(isExist);
};

const checkEmailIsUnique = async (email: string) => {
  const isExist = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(isExist);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Only strings are allowed.",
        required_error: "This field is required.",
      })
      .toLowerCase()
      .trim()
      .refine(checkUsernameIsUnique, "This username is already taken."),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmailIsUnique, "This email is already registered."),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters.")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters."),
  })
  .refine(checkPasswordConfirm, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getIronSession(cookies(), {
      cookieName: "carrot-market",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id; // encrypt
    await cookie.save();

    redirect("/profile");
  }
}
