import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dataSource from "./mysql.datasource";

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'my_database',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
};

export default config;
