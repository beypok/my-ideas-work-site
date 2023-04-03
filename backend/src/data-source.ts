import {DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQLHOST || 'localhost',
    port: parseInt(process.env.MYSQLPORT) || 3306,
    username: process.env.MYSQLUSER || 'ideaswork',
    password: process.env.MYSQLPASSWORD || 'ideaswork',
    database: process.env.MYSQLDATABASE || 'ideaswork',
    url: process.env.MYSQL_URL,
    migrations: ['dist/src/migrations/*.{ts,js}'],
    entities: ['dist/src/**/*.entity.{ts,js}'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'history',
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource
