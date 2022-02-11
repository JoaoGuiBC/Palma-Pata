import { Request, Response, Router } from "express";
import { resolve } from "path";

import { prisma } from "../database/prismaClient";
import { AppError } from "../errors/AppError";

import { SendEmailService } from "../services/SendEmailService";
import { CreateResetPasswordTokenService } from "../services/CreateResetPasswordTokenService";

const emailsRouter = Router();

emailsRouter.get(
  "/recoverPassword/:email",
  async (request: Request, response: Response) => {
    const { email } = request.params;

    const sendEmailService = new SendEmailService();
    const createResetTokenService = new CreateResetPasswordTokenService();

    const userExist = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      throw new AppError("Usuário inexistente", 406);
    }

    const resetToken = await createResetTokenService.execute({
      id_user: userExist.id,
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "templates",
      "emails",
      "forgotPasswordEmail.hbs"
    );

    const link = `${process.env.FRONT_END_URL}${resetToken.token}`;

    await sendEmailService.execute({
      email,
      subject: "Recuperação de senha - Pata e Palma",
      templatePath,
      templateVariables: {
        name: userExist.username,
        link,
      },
    });

    response.json({ status: "Success", message: "E-mail enviado com sucesso" });
  }
);

export { emailsRouter };
