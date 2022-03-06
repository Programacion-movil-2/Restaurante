-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dbportalesrestaurant
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbportalesrestaurant
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbportalesrestaurant` DEFAULT CHARACTER SET utf8 ;
USE `dbportalesrestaurant` ;

-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`cargos` (
  `idCargos` INT NOT NULL AUTO_INCREMENT,
  `nombreCargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCargos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`tipoproducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`tipoproducto` (
  `idTipoProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idTipoPrincipal` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoProducto`),
  INDEX `fk_TiposProductos_IdTipoPrincipal_idx` (`idTipoPrincipal` ASC) VISIBLE,
  CONSTRAINT `fk_TiposProductos_IdTipoPrincipal`
    FOREIGN KEY (`idTipoPrincipal`)
    REFERENCES `dbportalesrestaurant`.`tipoproducto` (`idTipoProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `imagen` VARCHAR(250) NULL DEFAULT NULL,
  `descripcion` VARCHAR(250) NULL DEFAULT NULL,
  `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
  `idTipoProducto` INT NOT NULL,
  PRIMARY KEY (`idProducto`),
  INDEX `fk_producto_tipoProducto1_idx` (`idTipoProducto` ASC) VISIBLE,
  CONSTRAINT `fk_producto_tipoProducto1`
    FOREIGN KEY (`idTipoProducto`)
    REFERENCES `dbportalesrestaurant`.`tipoproducto` (`idTipoProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`productoscombo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`productoscombo` (
  `idproductosCombo` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idproductosCombo`, `idProducto`),
  INDEX `fk_productosCombo_producto1_idx` (`idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_productosCombo_producto1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `dbportalesrestaurant`.`producto` (`idProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`combo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`combo` (
  `idCombo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `imagen` VARCHAR(250) NULL DEFAULT NULL,
  `detalle` VARCHAR(250) NULL DEFAULT NULL,
  `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
  `categoria` ENUM('dos', 'tres', 'familiar') NOT NULL,
  `idProductosCombo` INT NOT NULL,
  PRIMARY KEY (`idCombo`),
  INDEX `fk_combo_productosCombo1_idx` (`idProductosCombo` ASC) VISIBLE,
  CONSTRAINT `fk_combo_productosCombo1`
    FOREIGN KEY (`idProductosCombo`)
    REFERENCES `dbportalesrestaurant`.`productoscombo` (`idproductosCombo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`combospedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`combospedido` (
  `idCombos` INT NOT NULL,
  `idCombo` INT NOT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idCombos`, `idCombo`),
  INDEX `fk_combosPedido_combo1_idx` (`idCombo` ASC) VISIBLE,
  CONSTRAINT `fk_combosPedido_combo1`
    FOREIGN KEY (`idCombo`)
    REFERENCES `dbportalesrestaurant`.`combo` (`idCombo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`productospedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`productospedido` (
  `idProductosPedido` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductosPedido`, `idProducto`),
  INDEX `fk_productoPedido_producto1_idx` (`idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_productoPedido_producto1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `dbportalesrestaurant`.`producto` (`idProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`persona` (
  `idPersona` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(8) NOT NULL,
  `idCargo` INT NOT NULL,
  `direccion` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`idPersona`),
  INDEX `fk_persona_cargos1_idx` (`idCargo` ASC) VISIBLE,
  CONSTRAINT `fk_persona_cargos1`
    FOREIGN KEY (`idCargo`)
    REFERENCES `dbportalesrestaurant`.`cargos` (`idCargos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(250) NOT NULL,
  `pin` VARCHAR(4) NULL DEFAULT '0000',
  `correo` VARCHAR(50) NOT NULL,
  `idPersona` INT NOT NULL,
  `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_usuario_persona_idx` (`idPersona` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_persona`
    FOREIGN KEY (`idPersona`)
    REFERENCES `dbportalesrestaurant`.`persona` (`idPersona`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `direccionEntrega` VARCHAR(250) NOT NULL,
  `subtotal` DOUBLE NULL DEFAULT NULL,
  `idCombos` INT NULL DEFAULT NULL,
  `idProductosPedido` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `estado` ENUM('recibido', 'facturado', 'listo') NULL DEFAULT 'recibido',
  PRIMARY KEY (`idPedido`),
  INDEX `fk_pedido_combosPedido1_idx` (`idCombos` ASC) VISIBLE,
  INDEX `fk_pedido_productoPedido1_idx` (`idProductosPedido` ASC) VISIBLE,
  INDEX `fk_usuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_combosPedido1`
    FOREIGN KEY (`idCombos`)
    REFERENCES `dbportalesrestaurant`.`combospedido` (`idCombos`),
  CONSTRAINT `fk_pedido_productoPedido1`
    FOREIGN KEY (`idProductosPedido`)
    REFERENCES `dbportalesrestaurant`.`productospedido` (`idProductosPedido`),
  CONSTRAINT `fk_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `dbportalesrestaurant`.`usuario` (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dbportalesrestaurant`.`facturacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbportalesrestaurant`.`facturacion` (
  `idFactura` INT NOT NULL AUTO_INCREMENT,
  `isv` DOUBLE NOT NULL DEFAULT '0.15',
  `total` DOUBLE NOT NULL,
  `fecha` DATETIME NOT NULL,
  `idPedido` INT NOT NULL,
  PRIMARY KEY (`idFactura`),
  INDEX `fk_facturacion_pedido1_idx` (`idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_facturacion_pedido1`
    FOREIGN KEY (`idPedido`)
    REFERENCES `dbportalesrestaurant`.`pedido` (`idPedido`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
