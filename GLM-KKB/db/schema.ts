import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Product catalogue.
 * Every row is sourced from Kloof Kerf's own public listings (Mr D store menu
 * and the brand's official social posts). Nothing here is invented.
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 96 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  category: varchar("category", { length: 48 }).notNull(),
  animal: varchar("animal", { length: 48 }),
  description: text("description").notNull().default(""),
  /** Only populated when a price is publicly published. Never guessed. */
  priceCents: integer("price_cents"),
  priceLabel: varchar("price_label", { length: 48 }).notNull().default("In store"),
  unitLabel: varchar("unit_label", { length: 64 }).notNull().default(""),
  /** Key into the brand image manifest in src/content/site.ts */
  imageKey: varchar("image_key", { length: 64 }).notNull().default("pending"),
  /** "real" = verified Kloof Kerf photograph. "pending" = asset slot reserved. */
  imageStatus: varchar("image_status", { length: 16 }).notNull().default("pending"),
  assetPath: varchar("asset_path", { length: 160 }).notNull().default(""),
  sourceRef: varchar("source_ref", { length: 80 }).notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type EnquiryItem = {
  slug: string;
  name: string;
  quantity: number;
};

/** Gift / corporate / custom-order enquiries captured by the site. */
export const giftEnquiries = pgTable("gift_enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 48 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  enquiryType: varchar("enquiry_type", { length: 48 }).notNull().default("gift-boxes"),
  message: text("message").notNull().default(""),
  items: jsonb("items").$type<EnquiryItem[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type GiftEnquiry = typeof giftEnquiries.$inferSelect;
export type NewGiftEnquiry = typeof giftEnquiries.$inferInsert;
