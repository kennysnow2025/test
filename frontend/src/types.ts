// Type definitions matching the FastAPI backend models

export interface Item {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string;
    created_at: string;
}

export interface ItemCreate {
    name: string;
    description?: string;
    price: number;
    category: string;
}

export interface ItemUpdate {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export interface HealthStatus {
    status: string;
    timestamp: string;
    version: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';