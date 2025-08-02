// types/fbpixel.ts - Only parameter types, no global declaration
export type MetaPixelValue = string | number | boolean | null | undefined;

export interface MetaPixelParameters {
  content_category?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  currency?: string;
  custom_data?: Record<string, MetaPixelValue>;
  delivery_category?: string;
  num_items?: number;
  predicted_ltv?: number;
  search_string?: string;
  status?: boolean;
  value?: number;
  [key: string]: MetaPixelValue | string[] | Record<string, MetaPixelValue>;
}