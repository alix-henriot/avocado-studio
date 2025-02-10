import { mysqlTable, int, varchar, date, float, timestamp, datetime, decimal, boolean, mysqlEnum } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";


export const submission = mysqlTable("submission", {
  id: int("id").primaryKey().autoincrement(),
  service_id: int("service_id").notNull().references(() => service.id),
  material_id: int("material_id").notNull().references(() => material.id),
  editing_id: int("editing_id").notNull().references(() => editing.id),
  quantity: int("quantity"),
  city: varchar("city", { length: 100 }),
  longitude: float("longitude"),
  latitude: float("latitude"),
  date: date("date"),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  company: varchar("company", { length: 255 }),
  quote_id: int("quote_id"),
  created_at: timestamp("created_at").notNull().defaultNow()
});

export const editing = mysqlTable("editing", {
  id: int("id").primaryKey().autoincrement(),
  value: varchar("value", { length: 100 }),
  price: int("price"),
});

export const material = mysqlTable("material", {
  id: int("id").primaryKey().autoincrement(),
  value: varchar("value", { length: 100 }),
});

export const service = mysqlTable("service", {
  id: int("id").primaryKey().autoincrement(),
  value: varchar("value", { length: 100 }),
  photo_price: int("photo_price"),
  video_price: int("video_price"),
  photo_video_price: int("photo_video_price"),
});

export const travel = mysqlTable("travel", {
  id: int("id").primaryKey().autoincrement().notNull(),
  min: int("min").notNull(),
  max: int("max").notNull(),
  price: int("price").notNull()
});

export const quote = mysqlTable("quote", {
  // Core Fields
  id: int("id").primaryKey().autoincrement().notNull(),
  submissionId: int("submission_id").notNull(),
  public: varchar("public", { length: 50 }),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),

  // Service Details
  serviceId: int("service_id").notNull(),
  servicePrice: decimal("service_price", { precision: 10, scale: 2 }).notNull(),

  // Editing Details
  editingPrice: decimal("editing_price", { precision: 10, scale: 2 }).notNull(),

  // Setting Details
  setting: int("setting").notNull(),
  settingPrice: decimal("setting_price", { precision: 10, scale: 2 }).notNull(),

  // Quantity
  quantity: int("quantity").notNull(),

  // Discount Details
  discount: boolean("discount").notNull(),
  discountPercentage: decimal("discount_percentage", { precision: 5, scale: 2 }).notNull(),
  discountExpiration: datetime("discount_expiration")
    .default(sql`CURRENT_DATE + INTERVAL 1 WEEK`)
    .notNull(),

  // Travel Costs
  distance: int("distance").notNull(),
  travelPrice: decimal("travel_price", { precision: 10, scale: 2 }).notNull(),

  // Tax
  taxPercentage: decimal("tax_percentage", { precision: 5, scale: 2 }).notNull(),

  // Generated Fields (Calculated Columns)
  subtotal: decimal("subtotal", { precision: 10, scale: 2 })
    .notNull()
    .generatedAlwaysAs(`((service_price + editing_price + setting_price + travel_price) * quantity)`),

  discountPrice: decimal("discount_price", { precision: 10, scale: 2 })
    .notNull()
    .generatedAlwaysAs(`((service_price + editing_price + setting_price + travel_price) * quantity * 
      CASE WHEN discount THEN (1 - discount_percentage / 100) ELSE 1 END)`),

  total: decimal("total", { precision: 10, scale: 2 })
    .notNull()
    .generatedAlwaysAs(`((subtotal - discount_price) * (1 + tax_percentage / 100))`),
});

export type Quote = typeof quote.$inferSelect;
export type NewQuote = typeof quote.$inferInsert;
export type Travel = typeof travel.$inferSelect;
export type NewTravel = typeof travel.$inferInsert;