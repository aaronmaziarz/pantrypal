export type EntityId = string;
export type IsoTimestamp = string;

export type InventorySource =
    | "manual"
    | "barcode_scan"
    | "receipt_ocr"
    | "ai_scene_scan"
    | "rule"
    | "sync";

export type QuantityConfidence = "low" | "medium" | "high";

export interface QuantityValue {
    amount: number;
    unit: string;
}

export interface AuditFields {
    createdAt: IsoTimestamp;
    updatedAt: IsoTimestamp;
}
