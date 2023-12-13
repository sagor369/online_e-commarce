import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Users from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    const exist = await Users.findOne({ email: email });

    if (!exist) {
      return NextResponse.json({ message: "email doesn't exist" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "mehetajkhandaker@gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mehetajkhandaker@gmail.com",
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: "careeros@tryporpra.com",
      to: email,
      subject: "Reset your password",
      html: `<html xmlns="http://www.w3.org/1999/xhtml">

            <head>
            
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            
                <title>Forgot Password</title>
            
                <style>
            
                    body {
            
                        background-color: #FFFFFF; padding: 0; margin: 0;
            
                    }
            
                </style>
            
            </head>
            
            <body style="background-color: #FFFFFF; padding: 0; margin: 0;">
            
            <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
            
                <tr>
            
                    <td align="center" valign="top">
            
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
            
                            <!-- Logo -->
            
                            <tr>
            <h1>Style Print</h1>
            
                            </tr>
            
                            <!-- Title -->
            
                            <tr>
            
                                <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
            
                                    <span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span>
            
                                </td>
            
                            </tr>
            
                            <!-- Messages -->
            
                            <tr>
            
                                <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
            
                                    <span style="font-size: 12px; line-height: 1.5; color: #333333;">
            
                                        We have sent you this email in response to your request to reset your password on Style Print. After you reset your password.
            
                                        <br/><br/>
            
                                        To reset your password, please follow the link below:
            
                                        <a href="http://localhost:3000/forgot/${token}">Click Here to reset password</a>
            
                                        <br/><br/>
            
                                        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised.
            
                                        <br/><br/>
            
                                        If you need help, or you have any other questions, feel free to email styleprint@business.web, or call our customer service toll-free at 16458.
            
                                    </span>
            
                                </td>
            
                            </tr>
            
                        </table>
            
                    </td>
            
                </tr>
            
            </table>
            
            </body>
            
            </html>
        `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
