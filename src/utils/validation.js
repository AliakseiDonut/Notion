import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export const User = z.object({
  email: z.string().email({message: "Введите правильный email"}),
  password: z.string().min(8).refine((value) => passwordRegex.test(value), {
    message: "Пароль не надежен (Длина пароля >= 8 символам; Пароль содержит хотя бы одну заглавную букву; Пароль содержит хотя бы одну строчную букву; Пароль содержит хотя бы одну цифру.)",
  }),
  date: z.number(),
});