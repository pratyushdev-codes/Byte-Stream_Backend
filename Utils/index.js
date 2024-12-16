import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const hashString = async(useValue) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(useValue, salt);

    return hashedPassword;

}

export const compareString = async(plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
}

export const createJWT =  (id) => {

    return JWT.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    });

};