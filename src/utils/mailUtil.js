import nodemailer from 'nodemailer'
import { constants } from './constantsUtil.js'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: constants.MAIL_USER,
        pass: constants.MAIL_PASSWORD
    }
});

export const sendRecoveryMail = async (userEmail, token) => {
    const link = `http://localhost:${constants.PORT}/reset-password?token=${token}`;

    return await transport.sendMail({
        from: `E-commerce <${constants.MAIL_USER}>`,
        to: userEmail,
        subject: 'Recuperación de Contraseña',
        html: `
        <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 10px 25px rgba(0,0,0,0.05);">
                            
                            <tr>
                                <td align="center" style="padding-bottom:20px;">
                                    <h2 style="margin:0;color:#111827;">Restablece tu contraseña</h2>
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#4b5563;font-size:16px;line-height:1.6;padding-bottom:25px;">
                                    Hemos recibido una solicitud para restablecer tu contraseña. 
                                    Si fuiste tú, haz clic en el botón a continuación para crear una nueva contraseña.
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding-bottom:30px;">
                                    <a href="${link}" 
                                       style="display:inline-block;padding:14px 28px;background-color:#2563eb;color:#ffffff;
                                              text-decoration:none;font-weight:bold;border-radius:8px;font-size:16px;">
                                        Restablecer contraseña
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#6b7280;font-size:14px;line-height:1.6;padding-bottom:15px;">
                                    Este enlace expirará en <strong>1 hora</strong> por motivos de seguridad.
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#9ca3af;font-size:13px;line-height:1.5;padding-top:20px;border-top:1px solid #e5e7eb;">
                                    Si no solicitaste este cambio, puedes ignorar este correo. 
                                    Tu contraseña permanecerá segura.
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#9ca3af;font-size:12px;padding-top:20px;">
                                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                                    <br/>
                                    <a href="${link}" style="color:#2563eb;word-break:break-all;">${link}</a>
                                </td>
                            </tr>

                        </table>

                        <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                            <tr>
                                <td align="center" style="color:#9ca3af;font-size:12px;">
                                    © ${new Date().getFullYear()} E-commerce. Todos los derechos reservados.
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </div>
        `
    });
};