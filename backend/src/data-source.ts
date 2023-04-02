import {DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'ideaswork',
    password: 'ideaswork',
    database: 'ideaswork',
    migrations: ['dist/src/migrations/*.{ts,js}'],
    entities: ['dist/src/**/*.entity.{ts,js}'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'history',
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource
