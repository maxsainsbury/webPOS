-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema webpos_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webpos_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webpos_db` DEFAULT CHARACTER SET utf8 ;
USE `webpos_db` ;

-- -----------------------------------------------------
-- Table `webpos_db`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`employee` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `password` INT NOT NULL,
  `role` ENUM('admin', 'employee') NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `hourly_rate` DECIMAL(5,2) NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NULL,
  `hire_date` DATE NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` VARCHAR(15) NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`tax_rates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`tax_rates` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`tax_rates` (
  `tax_id` INT NOT NULL AUTO_INCREMENT,
  `tax_name` VARCHAR(45) NOT NULL,
  `tax_rate` DECIMAL(5,4) NOT NULL,
  PRIMARY KEY (`tax_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`prices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`prices` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`prices` (
  `price_id` INT NOT NULL AUTO_INCREMENT,
  `price` DECIMAL(6,2) NULL,
  PRIMARY KEY (`price_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`categories` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(50) NOT NULL,
  `tax_id` INT NULL,
  `price_id` INT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`category_name` ASC) VISIBLE,
  CONSTRAINT `category_tax_fk`
    FOREIGN KEY (`tax_id`)
    REFERENCES `webpos_db`.`tax_rates` (`tax_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_price_fk`
    FOREIGN KEY (`price_id`)
    REFERENCES `webpos_db`.`prices` (`price_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`items` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL,
  `is_available` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`item_id`),
  INDEX `category_fk_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_item_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webpos_db`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`mods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`mods` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`mods` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_name` VARCHAR(50) NULL,
  `category_id` INT NOT NULL,
  `is_available` BIT(1) NULL,
  PRIMARY KEY (`mod_id`),
  INDEX `category_fk_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_mod_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webpos_db`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`item_mod_default`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`item_mod_default` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`item_mod_default` (
  `item_id` INT NOT NULL,
  `mod_id` INT NOT NULL,
  PRIMARY KEY (`item_id`, `mod_id`),
  INDEX `addon_fk_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `item_mod_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `webpos_db`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_mod_mod_fk`
    FOREIGN KEY (`mod_id`)
    REFERENCES `webpos_db`.`mods` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`customers` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NULL,
  `phone` VARCHAR(15) NOT NULL,
  `address_line1` VARCHAR(100) NULL,
  `address_line2` VARCHAR(100) NULL,
  `email` VARCHAR(255) NULL,
  `city` VARCHAR(50) NULL,
  `provence` VARCHAR(3) NULL,
  `postal_code` VARCHAR(6) NULL,
  `delivery_instructions` TEXT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  `credit` DECIMAL(5,2) NULL DEFAULT 0,
  PRIMARY KEY (`customer_id`),
  INDEX `phone_index` (`phone` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`orders` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NULL,
  `user_id` INT NOT NULL,
  `order_number` INT NOT NULL,
  `order_type` ENUM('Quick Sale', 'WalkIn', 'Pickup', 'Delivery') NOT NULL,
  `order_status` ENUM('Scheduled', 'Pending', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled') NULL,
  `is_future_order` BIT(1) NULL,
  `scheduled_date` DATE NULL,
  `scheduled_time` TIME NULL,
  `payment_status` ENUM('Pending', 'Paid', 'Refunded') NULL DEFAULT 'Pending',
  `special_instructions` TEXT NULL,
  `in_use` TINYINT(1) NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customer_fk_idx` (`customer_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `order_number_UNIQUE` (`order_number` ASC) VISIBLE,
  CONSTRAINT `customer_id_fk`
    FOREIGN KEY (`customer_id`)
    REFERENCES `webpos_db`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `employee_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `webpos_db`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`order_items` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`order_items` (
  `order_items_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(6,2) NOT NULL,
  `line_total` DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (`order_items_id`),
  INDEX `order_fk_idx` (`order_id` ASC) VISIBLE,
  INDEX `item_fk_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `order_items_order_fk`
    FOREIGN KEY (`order_id`)
    REFERENCES `webpos_db`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_items_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `webpos_db`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`order_items_mods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`order_items_mods` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`order_items_mods` (
  `order_items_mod_id` INT NOT NULL AUTO_INCREMENT,
  `order_items_id` INT NOT NULL,
  `mod_id` INT NOT NULL,
  `quantity` INT NULL,
  `price_adjustment` DECIMAL(5,2) NOT NULL,
  INDEX `order_items_fk_idx` (`order_items_id` ASC) VISIBLE,
  INDEX `mod_fk_idx` (`mod_id` ASC) VISIBLE,
  PRIMARY KEY (`order_items_mod_id`),
  CONSTRAINT `order_items_fk`
    FOREIGN KEY (`order_items_id`)
    REFERENCES `webpos_db`.`order_items` (`order_items_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_items_mods_mod_fk`
    FOREIGN KEY (`mod_id`)
    REFERENCES `webpos_db`.`mods` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webpos_db`.`payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webpos_db`.`payments` ;

CREATE TABLE IF NOT EXISTS `webpos_db`.`payments` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `payment_method` ENUM('Cash', 'Credit Card', 'Debit Card', 'Online') NOT NULL,
  `amount` DECIMAL(8,2) NOT NULL,
  `processed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `tip` DECIMAL(8,2) NULL,
  PRIMARY KEY (`payment_id`),
  INDEX `order_id_fk_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `order_id_fk`
    FOREIGN KEY (`order_id`)
    REFERENCES `webpos_db`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS server;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'server' IDENTIFIED BY 'server';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `webpos_db`.* TO 'server';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
