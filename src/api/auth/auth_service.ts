import { Db } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { COL } from "../../constants";
import { JWT_CONFIG } from "../../config";

const registerUser = async (db: Db, body:any): Promise<any> => {
    try {
        const {
          firstName,
          lastName,
          email,
          password,
          picturePath,
          friends,
          location,
          occupation,
        } = body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertedData = await db.collection(COL.USERS).insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0,
        });

        const token = jwt.sign({ _id: insertedData.insertedId }, JWT_CONFIG.secret,{
            expiresIn: JWT_CONFIG.expiresIn,
        });

        const user = await db.collection(COL.USERS).findOne({ _id: insertedData.insertedId });

        delete user?.password;

        return {
            token,
            user,
        };

    } catch (error:any) {
        console.log(error.message)
    }

};

const loginUser = async (db: Db, body:any): Promise<any> => {
    try {
        const { email, password } = body;
        const user:any = await db.collection(COL.USERS).findOne({email});
        !user && new Error("User not found");
        const validPassword = await bcrypt.compare(password, user?.password);
        !validPassword && new Error("Invalid Credentials");
        const token = jwt.sign({ _id: user._id }, JWT_CONFIG.secret,{});
        delete user?.password;
        return {
            token,
            user,
        };
    } catch (error:any) {
        console.log(error.message)
    }
};

export {
    registerUser,
    loginUser,
}