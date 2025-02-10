CREATE TABLE `editing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	`price` int,
	CONSTRAINT `editing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `material` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	CONSTRAINT `material_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(100),
	`photo_price` int,
	`video_price` int,
	`photo_video_price` int,
	CONSTRAINT `service_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submission` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`material_id` int NOT NULL,
	`editing_id` int NOT NULL,
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
ALTER TABLE `submission` ADD CONSTRAINT `submission_service_id_service_id_fk` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission` ADD CONSTRAINT `submission_material_id_material_id_fk` FOREIGN KEY (`material_id`) REFERENCES `material`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `submission` ADD CONSTRAINT `submission_editing_id_editing_id_fk` FOREIGN KEY (`editing_id`) REFERENCES `editing`(`id`) ON DELETE no action ON UPDATE no action;