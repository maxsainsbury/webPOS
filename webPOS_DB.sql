-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema webPOS_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webPOS_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webPOS_DB` DEFAULT CHARACTER SET utf8 ;
USE `webPOS_DB` ;

-- -----------------------------------------------------
-- Table `webPOS_DB`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`employee` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `password` INT NOT NULL,
  `role` ENUM('admin', 'employee') NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `hourly_rate` DECIMAL(5,2) NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  `hire_date` DATE NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` VARCHAR(15) NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`categories` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`category_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`items` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL,
  `size` VARCHAR(20) NULL,
  `is_available` BIT(1) NULL DEFAULT 1,
  `tax_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `category_fk_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_item_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webPOS_DB`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`mods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`mods` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`mods` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `category_id` INT NOT NULL,
  `is_available` BIT(1) NULL,
  `tax_id` INT NOT NULL,
  PRIMARY KEY (`mod_id`),
  INDEX `category_fk_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_mod_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webPOS_DB`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`item_mod`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`item_mod` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`item_mod` (
  `item_id` INT NOT NULL,
  `mod_id` INT NOT NULL,
  `is_default` BIT(1) NULL DEFAULT 0,
  `max_quantity` INT NULL DEFAULT 1,
  PRIMARY KEY (`item_id`, `mod_id`),
  INDEX `addon_fk_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `item_mod_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `webPOS_DB`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_mod_mod_fk`
    FOREIGN KEY (`mod_id`)
    REFERENCES `webPOS_DB`.`mods` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`customers` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `f_name` VARCHAR(45) NULL,
  `l_name` VARCHAR(45) NULL,
  `phone` VARCHAR(15) NOT NULL,
  `address_line1` VARCHAR(100) NULL,
  `address_line2` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
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
-- Table `webPOS_DB`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`orders` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NULL,
  `user_id` INT NOT NULL,
  `order_number` INT NOT NULL,
  `order_type` ENUM('Dine-in', 'Takeout', 'Delivery') NOT NULL,
  `order_status` ENUM('Scheduled', 'Pending', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled') NULL,
  `is_future_order` BIT(1) NULL,
  `scheduled_date` DATE NULL,
  `scheduled_time` TIME NULL,
  `subtotal` DECIMAL(8,2) NOT NULL,
  `tax_amount` DECIMAL(6,2) NOT NULL,
  `tip_amount` DECIMAL(6,2) NULL,
  `payment_status` ENUM('Pending', 'Paid', 'Refunded') NULL DEFAULT 'Pending',
  `special_instructions` TEXT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customer_fk_idx` (`customer_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `order_number_UNIQUE` (`order_number` ASC) VISIBLE,
  CONSTRAINT `customer_id_fk`
    FOREIGN KEY (`customer_id`)
    REFERENCES `webPOS_DB`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `employee_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `webPOS_DB`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`order_items` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`order_items` (
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
    REFERENCES `webPOS_DB`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_items_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `webPOS_DB`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`order_items_mods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`order_items_mods` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`order_items_mods` (
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
    REFERENCES `webPOS_DB`.`order_items` (`order_items_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_items_mods_mod_fk`
    FOREIGN KEY (`mod_id`)
    REFERENCES `webPOS_DB`.`mods` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`payments` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`payments` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `payment_method` ENUM('Cash', 'Credit Card', 'Debit Card', 'Online') NOT NULL,
  `amount` DECIMAL(8,2) NOT NULL,
  `processed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  INDEX `order_id_fk_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `order_id_fk`
    FOREIGN KEY (`order_id`)
    REFERENCES `webPOS_DB`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`tax_rates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`tax_rates` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`tax_rates` (
  `tax_id` INT NOT NULL AUTO_INCREMENT,
  `tax_name` VARCHAR(45) NOT NULL,
  `tax_rate` DECIMAL(5,4) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`tax_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE,
  CONSTRAINT `tax_categorie_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webPOS_DB`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webPOS_DB`.`prices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `webPOS_DB`.`prices` ;

CREATE TABLE IF NOT EXISTS `webPOS_DB`.`prices` (
  `price_id` INT NOT NULL AUTO_INCREMENT,
  `price` DECIMAL(6,2) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`price_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE,
  CONSTRAINT `price_categorie_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `webPOS_DB`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
