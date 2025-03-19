CREATE TABLE `editing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` boolean NOT NULL,
	CONSTRAINT `editing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `material` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	CONSTRAINT `material_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `material_editing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`material_id` int,
	`editing_id` int,
	`price` int NOT NULL,
	CONSTRAINT `material_editing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quote` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submission_id` int,
	`public` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	`service_price` int NOT NULL,
	`quantity` int NOT NULL,
	`discount` boolean NOT NULL,
	`discount_percentage` int NOT NULL,
	`discount_expiration` timestamp DEFAULT (now()),
	`distance` int NOT NULL,
	`travel_price` int NOT NULL,
	`tax_percentage` int NOT NULL,
	`subtotal_price` int NOT NULL,
	`discount_price` int NOT NULL,
	`total_price` int NOT NULL,
	CONSTRAINT `quote_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	CONSTRAINT `service_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_material` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int,
	`material_id` int,
	`price` int NOT NULL,
	CONSTRAINT `service_material_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	`price` int NOT NULL,
	CONSTRAINT `setting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submission` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int,
	`material_id` int,
	`editing_id` int,
	`quantity` int,
	`city` varchar(100),
	`longitude` float,
	`latitude` float,
	`date` date,
	`name` varchar(255),
	`email` varchar(255),
	`company` varchar(255),
	`quote_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `submission_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submission_setting` (
	`submission_id` int NOT NULL,
	`setting_id` int NOT NULL,
	CONSTRAINT `submission_setting_submission_id_setting_id_pk` PRIMARY KEY(`submission_id`,`setting_id`)
);
--> statement-breakpoint
CREATE TABLE `travel` (
	`id` int AUTO_INCREMENT NOT NULL,
	`min` int NOT NULL,
	`max` int NOT NULL,
	`price` int NOT NULL,
	CONSTRAINT `travel_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `material_editing` ADD CONSTRAINT `material_editing_material_id_material_id_fk` FOREIGN KEY (`material_id`) REFERENCES `material`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `material_editing` ADD CONSTRAINT `material_editing_editing_id_editing_id_fk` FOREIGN KEY (`editing_id`) REFERENCES `editing`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quote` ADD CONSTRAINT `quote_submission_id_submission_id_fk` FOREIGN KEY (`submission_id`) REFERENCES `submission`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_material` ADD CONSTRAINT `service_material_service_id_service_id_fk` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_material` ADD CONSTRAINT `service_material_material_id_material_id_fk` FOREIGN KEY (`material_id`) REFERENCES `material`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission` ADD CONSTRAINT `submission_service_id_service_id_fk` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission` ADD CONSTRAINT `submission_material_id_material_id_fk` FOREIGN KEY (`material_id`) REFERENCES `material`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission` ADD CONSTRAINT `submission_editing_id_editing_id_fk` FOREIGN KEY (`editing_id`) REFERENCES `editing`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission_setting` ADD CONSTRAINT `submission_setting_submission_id_submission_id_fk` FOREIGN KEY (`submission_id`) REFERENCES `submission`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission_setting` ADD CONSTRAINT `submission_setting_setting_id_setting_id_fk` FOREIGN KEY (`setting_id`) REFERENCES `setting`(`id`) ON DELETE no action ON UPDATE no action;