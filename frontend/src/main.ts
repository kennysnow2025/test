import { ApiClient, formatCurrency, formatDate } from './api.js';
import { Item, ItemCreate, ItemUpdate } from './types.js';
import { UI } from './ui.js';

/**
 * Main application class that handles all the frontend logic
 */
class ItemManager {
    private items: Item[] = [];
    private filteredItems: Item[] = [];
    private currentFilter: string = '';

    constructor() {
        this.init();
    }

    /**
     * Initialize the application
     */
    private async init(): Promise<void> {
        console.log('🚀 Initializing Item Manager...');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check API health
        await this.checkApiHealth();
        
        // Load initial data
        await this.loadItems();
        
        console.log('✅ Item Manager initialized successfully');
    }

    /**
     * Set up all event listeners
     */
    private setupEventListeners(): void {
        // Add item form
        const addForm = document.getElementById('add-item-form');
        addForm?.addEventListener('submit', (e) => this.handleAddItem(e));

        // Edit item form
        const editForm = document.getElementById('edit-item-form');
        editForm?.addEventListener('submit', (e) => this.handleEditItem(e));

        // Filter dropdown
        const filterCategory = document.getElementById('filter-category') as HTMLSelectElement;
        filterCategory?.addEventListener('change', (e) => this.handleFilterChange(e));

        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        refreshBtn?.addEventListener('click', () => this.loadItems());

        // Modal close events
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('edit-modal');
            if (e.target === modal) {
                this.closeEditModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEditModal();
            }
        });
    }

    /**
     * Check API health status
     */
    private async checkApiHealth(): Promise<void> {
        const response = await ApiClient.getHealth();
        
        if (response.error) {
            UI.updateApiStatus(false);
            UI.showToast('Failed to connect to API. Make sure the FastAPI server is running on port 8000.', 'error');
        } else {
            UI.updateApiStatus(true);
            console.log('✅ API is healthy:', response.data);
        }
    }

    /**
     * Load all items from the API
     */
    private async loadItems(): Promise<void> {
        UI.showLoading(true);
        
        try {
            const response = await ApiClient.getItems();
            
            if (response.error) {
                UI.showToast(`Failed to load items: ${response.error}`, 'error');
                UI.showNoItems();
                return;
            }

            this.items = response.data || [];
            this.applyCurrentFilter();
            this.renderItems();
            
            console.log(`📦 Loaded ${this.items.length} items`);
            
        } catch (error) {
            console.error('Error loading items:', error);
            UI.showToast('An unexpected error occurred while loading items', 'error');
            UI.showNoItems();
        } finally {
            UI.showLoading(false);
        }
    }

    /**
     * Apply current filter to items
     */
    private applyCurrentFilter(): void {
        if (!this.currentFilter) {
            this.filteredItems = [...this.items];
        } else {
            this.filteredItems = this.items.filter(
                item => item.category.toLowerCase() === this.currentFilter.toLowerCase()
            );
        }
    }

    /**
     * Render items in the UI
     */
    private renderItems(): void {
        const container = document.getElementById('items-container');
        if (!container) return;

        if (this.filteredItems.length === 0) {
            UI.showNoItems();
            return;
        }

        container.innerHTML = '';
        container.className = 'items-grid';

        this.filteredItems.forEach(item => {
            const itemCard = this.createItemCard(item);
            container.appendChild(itemCard);
        });

        container.style.display = 'block';
    }

    /**
     * Create an item card element
     */
    private createItemCard(item: Item): HTMLElement {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <h4 class="item-title">${this.escapeHtml(item.name)}</h4>
                    <span class="item-category">${this.escapeHtml(item.category)}</span>
                </div>
            </div>
            <div class="item-price">${formatCurrency(item.price)}</div>
            ${item.description ? `<p class="item-description">${this.escapeHtml(item.description)}</p>` : ''}
            <div class="item-meta">
                <i class="fas fa-calendar"></i> Created: ${formatDate(item.created_at)}
            </div>
            <div class="item-actions">
                <button class="btn btn-secondary btn-sm" onclick="itemManager.editItem(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="itemManager.deleteItem(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        return card;
    }

    /**
     * Handle add item form submission
     */
    private async handleAddItem(event: Event): Promise<void> {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const itemData: ItemCreate = {
            name: formData.get('name') as string,
            description: formData.get('description') as string || undefined,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
        };

        // Validate required fields
        if (!itemData.name || !itemData.category || !itemData.price || itemData.price <= 0) {
            UI.showToast('Please fill in all required fields with valid values', 'warning');
            return;
        }

        UI.setFormDisabled('add-item-form', true);
        
        try {
            const response = await ApiClient.createItem(itemData);
            
            if (response.error) {
                UI.showToast(`Failed to create item: ${response.error}`, 'error');
                return;
            }

            UI.showToast('Item created successfully!', 'success');
            UI.clearForm('add-item-form');
            await this.loadItems();
            UI.scrollToTop();
            
        } catch (error) {
            console.error('Error creating item:', error);
            UI.showToast('An unexpected error occurred while creating the item', 'error');
        } finally {
            UI.setFormDisabled('add-item-form', false);
        }
    }

    /**
     * Handle edit item form submission
     */
    private async handleEditItem(event: Event): Promise<void> {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const itemId = parseInt(formData.get('id') as string);
        
        const itemData: ItemUpdate = {
            name: formData.get('name') as string || undefined,
            description: formData.get('description') as string || undefined,
            price: formData.get('price') ? parseFloat(formData.get('price') as string) : undefined,
            category: formData.get('category') as string || undefined,
        };

        // Remove undefined values
        Object.keys(itemData).forEach(key => {
            if (itemData[key as keyof ItemUpdate] === undefined) {
                delete itemData[key as keyof ItemUpdate];
            }
        });

        UI.setFormDisabled('edit-item-form', true);
        
        try {
            const response = await ApiClient.updateItem(itemId, itemData);
            
            if (response.error) {
                UI.showToast(`Failed to update item: ${response.error}`, 'error');
                return;
            }

            UI.showToast('Item updated successfully!', 'success');
            this.closeEditModal();
            await this.loadItems();
            
        } catch (error) {
            console.error('Error updating item:', error);
            UI.showToast('An unexpected error occurred while updating the item', 'error');
        } finally {
            UI.setFormDisabled('edit-item-form', false);
        }
    }

    /**
     * Handle filter change
     */
    private handleFilterChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.currentFilter = select.value;
        this.applyCurrentFilter();
        this.renderItems();
        
        const filterText = this.currentFilter ? ` (${this.currentFilter})` : '';
        console.log(`🔍 Filter applied${filterText}: ${this.filteredItems.length} items shown`);
    }

    /**
     * Edit item - open modal with item data
     */
    public async editItem(id: number): Promise<void> {
        const item = this.items.find(i => i.id === id);
        if (!item) {
            UI.showToast('Item not found', 'error');
            return;
        }

        // Populate edit form
        const editForm = document.getElementById('edit-item-form') as HTMLFormElement;
        if (editForm) {
            (editForm.querySelector('#edit-item-id') as HTMLInputElement).value = id.toString();
            (editForm.querySelector('#edit-item-name') as HTMLInputElement).value = item.name;
            (editForm.querySelector('#edit-item-description') as HTMLTextAreaElement).value = item.description || '';
            (editForm.querySelector('#edit-item-price') as HTMLInputElement).value = item.price.toString();
            (editForm.querySelector('#edit-item-category') as HTMLSelectElement).value = item.category;
        }

        // Show modal
        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    /**
     * Close edit modal
     */
    public closeEditModal(): void {
        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        UI.clearForm('edit-item-form');
    }

    /**
     * Delete item with confirmation
     */
    public async deleteItem(id: number): Promise<void> {
        const item = this.items.find(i => i.id === id);
        if (!item) {
            UI.showToast('Item not found', 'error');
            return;
        }

        const confirmed = await UI.confirm(`Are you sure you want to delete "${item.name}"?`);
        if (!confirmed) return;

        try {
            const response = await ApiClient.deleteItem(id);
            
            if (response.error) {
                UI.showToast(`Failed to delete item: ${response.error}`, 'error');
                return;
            }

            UI.showToast('Item deleted successfully!', 'success');
            await this.loadItems();
            
        } catch (error) {
            console.error('Error deleting item:', error);
            UI.showToast('An unexpected error occurred while deleting the item', 'error');
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make itemManager globally available for onclick handlers
    (window as any).itemManager = new ItemManager();
});

// Also make functions available globally for onclick handlers
(window as any).closeEditModal = () => {
    (window as any).itemManager?.closeEditModal();
};