import cypto from 'crypto';

export const salt = cypto.randomBytes(16).toString('hex');
export const hash = (password: string) => {
    return cypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
}
export const verify = (password: string, hashedPassword: string) => {
    const generatedHash = hash(password);
    return generatedHash === hashedPassword;
}