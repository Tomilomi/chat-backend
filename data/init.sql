-- Eliminar base si existe (con cuidado en producción)
IF DB_ID('tomilomichat') IS NOT NULL
BEGIN
    DROP DATABASE project1;
END
GO

-- Crear base de datos
CREATE DATABASE tomilomichat;
GO

USE tomilomichat;
GO

-- Tabla de imágenes (Pictures)
CREATE TABLE Picture (
    pp_number INT PRIMARY KEY,
    pp_image VARBINARY(MAX)
);
GO

-- Tabla de usuarios (Usuario)
CREATE TABLE Usuario (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    user_name NVARCHAR(50) NOT NULL,
    user_password NVARCHAR(255) NOT NULL, -- almacenar hash, no texto plano
    user_number_pp INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_number_pp) REFERENCES Picture(pp_number)
);
GO

-- Tabla de mensajes (Message)
CREATE TABLE Message (
    message_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    date_time DATETIME NOT NULL DEFAULT GETDATE(),
    content NVARCHAR(MAX),
    FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
);
GO
