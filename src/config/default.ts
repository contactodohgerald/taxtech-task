import dotevn from 'dotenv';

dotevn.config();


class DefaultExports {

    port: any = () => process.env.SERVER_PORT;

    jwt_secret: any = () => process.env.JWT_SECRET;

    jwt_expires: any = () => process.env.JWT_EXPIRES;

}

export default new DefaultExports();