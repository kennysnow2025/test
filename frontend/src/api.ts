import { Item, ItemCreate, ItemUpdate, ApiResponse, HealthStatus } from './types.js';

// API base URL - adjust this if your FastAPI server runs on a different port
const API_BASE_URL = 'http://localhost:8000';

/**
 * Generic API request handler with error handling
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const status = response.status;

        // Handle different response types
        if (response.status === 204) {
            // No content responses (like DELETE)
            return { status };
        }

        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.detail || `HTTP ${status}: ${response.statusText}`,
                status,
            };
        }

        return { data, status };
    } catch (error) {
        console.error('API request failed:', error);
        return {
            error: error instanceof Error ? error.message : 'Network error occurred',
            status: 0,
        };
    }
}

/**
 * API client class with all endpoint methods
 */
export class ApiClient {
    /**
     * Check API health status
     */
    static async getHealth(): Promise<ApiResponse<HealthStatus>> {
        return apiRequest<HealthStatus>('/health');
    }

    /**
     * Get all items with optional pagination
     */
    static async getItems(skip: number = 0, limit: number = 100): Promise<ApiResponse<Item[]>> {
        return apiRequest<Item[]>(`/items?skip=${skip}&limit=${limit}`);
    }

    /**
     * Get a specific item by ID
     */
    static async getItem(id: number): Promise<ApiResponse<Item>> {
        return apiRequest<Item>(`/items/${id}`);
    }

    /**
     * Create a new item
     */
    static async createItem(item: ItemCreate): Promise<ApiResponse<Item>> {
        return apiRequest<Item>('/items', {
            method: 'POST',
            body: JSON.stringify(item),
        });
    }

    /**
     * Update an existing item
     */
    static async updateItem(id: number, item: ItemUpdate): Promise<ApiResponse<Item>> {
        return apiRequest<Item>(`/items/${id}`, {
            method: 'PUT',
            body: JSON.stringify(item),
        });
    }

    /**
     * Delete an item
     */
    static async deleteItem(id: number): Promise<ApiResponse<void>> {
        return apiRequest<void>(`/items/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * Get items by category
     */
    static async getItemsByCategory(category: string): Promise<ApiResponse<Item[]>> {
        return apiRequest<Item[]>(`/items/category/${encodeURIComponent(category)}`);
    }
}

/**
 * Utility function to format currency
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

/**
 * Utility function to format date
 */
export function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
}