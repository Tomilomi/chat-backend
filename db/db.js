import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';



dotenv.config();

const sequelize = new Sequelize('tomilomichat', process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            trustServerCertificate: true,
            server: process.env.DB_SERVER,
        },
    },
    logging: false,
    port: process.env.DB_PORT || 1433,
});

/*
sequelize.authenticate()
  .then(async () => {
    console.log('✅ Conexión establecida con éxito.');

    try {
      const [results, metadata] = await sequelize.query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);

      console.log('📋 Tablas encontradas:');
      results.forEach(row => console.log(`- ${row.TABLE_NAME}`));
    } catch (err) {
      console.error('❌ Error al listar las tablas:', err);
    } finally {
      await sequelize.close(); // Cerramos la conexión
    }

  })
  .catch((err) => {
    console.error('❌ No se pudo conectar a la base de datos:', err);
  });
*/
export default sequelize;
