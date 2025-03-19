import { mysqlTable, int, varchar, date, float, timestamp, datetime, decimal, boolean, mysqlEnum, primaryKey } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";


export const submission = mysqlTable("submission", {
  id: int("id").primaryKey().autoincrement(),
  service_id: int("service_id").references(() => service.id),
  material_id: int("material_id").references(() => material.id),
  editing_id: int("editing_id").references(() => editing.id),
  quantity: int("quantity"),
  city: varchar("city", { length: 100 }),
  longitude: float("longitude"),
  latitude: float("latitude"),
  date: date("date"),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  company: varchar("company", { length: 255 }),
  quote_id: int("quote_id"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const setting = mysqlTable("setting", {
  id: int("id").primaryKey().autoincrement().notNull(),
  value: varchar("value", { length: 100 }),
  price: int("price").notNull(),
});

export const submissionSetting = mysqlTable('submission_setting', 
  {
    submissionId: int('submission_id').notNull().references(() => submission.id),
    settingId: int('setting_id').notNull().references(() => setting.id),
  },
  (table) => [primaryKey({columns: [table.submissionId, table.settingId]}),]
);

export const submissionsRelations = relations(submission, ({ one, many }) => ({
  service: one(service, {
    fields: [submission.service_id],
    references: [service.id],
  }),
  material: one(material, {
    fields: [submission.material_id],
    references: [material.id],
  }),
  editing: one(editing, {
    fields: [submission.editing_id],
    references: [editing.id],
  }),
  setting: many(submissionSetting),
}));

export const settingsRelations = relations(setting, ({ many }) => ({
  submissions: many(submissionSetting),
}));

export const submissionSettingsRelations = relations(submissionSetting, ({ one }) => ({
  submission: one(submission, {
    fields: [submissionSetting.submissionId],
    references: [submission.id],
  }),
  setting: one(setting, {
    fields: [submissionSetting.settingId],
    references: [setting.id],
  }),
}));


export const editing = mysqlTable("editing", {
  id: int("id").primaryKey().autoincrement(),
  value: boolean().notNull(),
});

export const material = mysqlTable("material", {
  id: int("id").primaryKey().autoincrement(),
  value: varchar("value", { length: 100 }),
});

export const materialEditing = mysqlTable("material_editing", {
  id: int("id").primaryKey().autoincrement(),
  material_id: int("material_id").references(() => material.id),
  editing_id: int("editing_id").references(() => editing.id),
  price: int("price").notNull(),
});

export const materialRelations = relations(material, ({ many }) => ({
  editingOptions: many(materialEditing),
}));

export const editingRelations = relations(editing, ({ many }) => ({
  materialOptions: many(materialEditing),
}));

export const materialEditingRelations = relations(materialEditing, ({ one }) => ({
  material: one(material, {
    fields: [materialEditing.material_id],
    references: [material.id],
  }),
  editing: one(editing, {
    fields: [materialEditing.editing_id],
    references: [editing.id],
  }),
}));

export const service = mysqlTable("service", {
  id: int("id").primaryKey().autoincrement(),
  value: varchar("value", { length: 100 }),
});



export const serviceMaterial = mysqlTable("service_material", {
  id: int("id").primaryKey().autoincrement(),
  service_id: int("service_id").references(() => service.id),
  material_id: int("material_id").references(() => material.id),
  price: int("price").notNull(),
});

export const travel = mysqlTable("travel", {
  id: int("id").primaryKey().autoincrement().notNull(),
  min: int("min").notNull(),
  max: int("max").notNull(),
  price: int("price").notNull()
});


export const quote = mysqlTable("quote", {
  id: int("id").primaryKey().autoincrement().notNull(),
  submission_id: int("submission_id").references(() => submission.id),
  public: varchar("public", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),

  servicePrice: int("service_price").notNull(),

  quantity: int("quantity").notNull(),

  discount: boolean("discount").notNull(),
  discountPercentage: int("discount_percentage").notNull(),
  discountExpiration: timestamp("discount_expiration").defaultNow(),
  //.default(sql`DATE_ADD(CURDATE(), INTERVAL 1 WEEK)`),

  distance: int("distance").notNull(),
  travelPrice: int("travel_price").notNull(),

  // Tax
  taxPercentage: int("tax_percentage").notNull(),

  // Generated Fields (Calculated Columns)
  subtotal_price: int("subtotal_price").notNull(),

  discountPrice: int("discount_price").notNull(),
  total_price: int("total_price").notNull(),

});

export const quoteRelations = relations(quote, ({ one }) => ({
  submission: one(submission, {
    fields: [quote.submission_id],
    references: [submission.id],
  }),
}));

export const category = mysqlTable('category', {
  id: int('id').primaryKey().autoincrement().notNull(),
  value: varchar('value', { length: 50 })
});

export const image = mysqlTable('image', {
  id: int('id').primaryKey().autoincrement().notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 200 }),
  url: varchar('url', { length: 100 }).notNull(),
  categoryId: int('category_id').references(() => category.id)
});


export type Quote = typeof quote.$inferSelect;
export type NewQuote = typeof quote.$inferInsert;
export type Travel = typeof travel.$inferSelect;
export type NewTravel = typeof travel.$inferInsert;

/*

INITIAL VALUES :
-- First create tables with no dependencies
INSERT INTO setting (value, price)
VALUES ('outdoor', 50), ('indoor', 0), ('studio', 100);

-- Create editing options first as they're referenced by material_editing
INSERT INTO editing (id, value)
VALUES (1, false),
       (2, true);

-- Create services before service_material references them
INSERT INTO service (value)
VALUES ('fashion'),
       ('event'),
       ('food'),
       ('wedding'),
       ('product');

-- Create materials before service_material and material_editing references them
INSERT INTO material (value)
VALUES 
('photo'),
('video'),
('photo_video');

-- Now create service_material relationships
INSERT INTO service_material (service_id, material_id, price)
VALUES (1, 1, 260),
(1, 2, 350),
(1, 3, 450),
(2, 1, 360),
(2, 2, 460),
(2, 3, 600),
(3, 1, 360),
(3, 2, 460),
(3, 3, 600),
(4, 1, 1198),
(4, 2, 1599),
(4, 3, 1899),
(5, 1, 300),
(5, 2, 420),
(5, 3, 620);

-- Create travel prices (no dependencies)
INSERT INTO travel (min, max, price)
VALUES 
(0, 50000, 0),
(50001, 150000, 50),
(150001, 300000, 100),
(300001, 1000000, 300),
(1000001, 20000000, 800);

-- Finally create material_editing relationships
INSERT INTO material_editing (material_id, editing_id, price)
VALUES (1, 1, 0),
(1, 2, 0),
(2, 1, 0),
(2, 2, 200),
(3, 1, 0),
(3, 2, 250);


INSERT INTO category (value)
VALUES ('fashion'), ('event'), ('food'), ('product'), ('wedding'), ('art');
*/