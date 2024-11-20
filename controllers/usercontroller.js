import { UserModel } from "../models/usermodels.js";
import { userLoginValidator, userRegisterValidator, userUpdateValidator } from "../validators/uservalidators.js";
import { mailTransporter } from "../utils/mail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const userRegister = async (req, res, next) => {
    try {
        // checking if inputed details are correct
        const { error, value } = userRegisterValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }
        // check the database if the email exist already
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            res.status(200).json("user already exist");
        }
        const hashedpassword = bcrypt.hashSync(value.password, 10);
        // save to database
        await UserModel.create({
            ...value,
            password: hashedpassword
        });
        // send email to user
        await mailTransporter.sendMail({
            from: "chatroom011@gmail.com",
            to: value.email,
            subject: "Welcome to chatroom",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            border-radius: 10px;
                        }
                        .header {
                            background-color: #4A90E2;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            border-radius: 0 0 8px 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .welcome-text {
                            color: #333;
                            font-size: 16px;
                            line-height: 1.6;
                            margin: 20px 0;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #4A90E2;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #666;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>Welcome to Chatroom! 🎉</h1>
                        </div>
                        <div class="content">
                            <p class="welcome-text">
                                Hi there!
                            </p>
                            <p class="welcome-text">
                                Thank you for joining Chatroom. Your account has been successfully created, 
                                and you're now part of our growing community!
                            </p>
                            <p class="welcome-text">
                                Get started by exploring our chat rooms and connecting with other members.
                            </p>
                            <center>
                                <a href="YOUR_WEBSITE_URL" class="button">Start Chatting Now</a>
                            </center>
                            <p class="welcome-text">
                                If you have any questions, feel free to reach out to our support team.
                            </p>
                            <p class="welcome-text">
                                Best regards,<br>
                                The Chatroom Team
                            </p>
                        </div>
                        <div class="footer">
                            <p>© 2024 Chatroom. All rights reserved.</p>
                            <p>This email was sent to ${value.email}</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });
        // send response
        res.status(200).json("User Successfully registered")
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        // validate the person credentials
        const { error, value } = userLoginValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }

        // find user with email
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            res.status(404).json("Invalid Credentials");
        }
        // check for validity of password
        const correctpassword = bcrypt.compare(value.password, user.password);
        if (!correctpassword) {
            res.status(404).json("Invalid Credentials");
        }
        // now generate a token for the person
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: "24h",
        });
        res.json({
            message: "user logged in", accessToken: token,
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel
            .findById(req.auth.id)
            .select({
                password: false,
            });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }

};

export const updateUserProfile = async (req, res, next) => {
    try {
        // Validate the user request
        const { error, value } = userUpdateValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
        // Find the user ID
        const updatedVendor = await UserModel.findByIdAndUpdate(
            req.auth.id,
            value,
            { new: true }
        );
        console.log(updatedVendor)
        if (!updatedVendor) {
            return res.status(404).json({ message: "user not found" });
        }
        //Send the updated vendor profile
        res.json("Profile updated successfully");
    } catch (error) {
        next(error);
    }
}

export const userLogout = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Successfully logged out",
            accessToken: null
        });
    } catch (error) {
        next(error);
    }
}

