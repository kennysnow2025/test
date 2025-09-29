import { ToastType } from './types.js';

/**
 * UI utility functions for DOM manipulation and user feedback
 */
export class UI {
    /**
     * Show a toast notification
     */
    static showToast(message: string, type: ToastType = 'info', duration: number = 4000): void {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
        };

        toast.innerHTML = `
            <i class="toast-icon ${iconMap[type]}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    /**
     * Show loading state
     */
    static showLoading(show: boolean = true): void {
        const loading = document.getElementById('loading');
        const itemsContainer = document.getElementById('items-container');
        const noItems = document.getElementById('no-items');

        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
        if (itemsContainer) {
            itemsContainer.style.display = show ? 'none' : 'block';
        }
        if (noItems) {
            noItems.style.display = 'none';
        }
    }

    /**
     * Show no items message
     */
    static showNoItems(): void {
        const loading = document.getElementById('loading');
        const itemsContainer = document.getElementById('items-container');
        const noItems = document.getElementById('no-items');

        if (loading) loading.style.display = 'none';
        if (itemsContainer) itemsContainer.style.display = 'none';
        if (noItems) noItems.style.display = 'block';
    }

    /**
     * Update API status indicator
     */
    static updateApiStatus(isHealthy: boolean): void {
        const statusIndicator = document.getElementById('api-status');
        if (!statusIndicator) return;

        const dot = statusIndicator.querySelector('.status-dot');
        const text = statusIndicator.querySelector('.status-text');

        if (dot && text) {
            if (isHealthy) {
                dot.className = 'status-dot healthy';
                text.textContent = 'API Connected';
            } else {
                dot.className = 'status-dot error';
                text.textContent = 'API Disconnected';
            }
        }
    }

    /**
     * Clear form inputs
     */
    static clearForm(formId: string): void {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (form) {
            form.reset();
        }
    }

    /**
     * Get form data as object
     */
    static getFormData(formId: string): Record<string, any> {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) return {};

        const formData = new FormData(form);
        const data: Record<string, any> = {};

        for (const [key, value] of formData.entries()) {
            // Convert numeric fields
            if (key === 'price') {
                data[key] = parseFloat(value as string);
            } else if (value === '') {
                // Skip empty values
                continue;
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    /**
     * Populate form with data
     */
    static populateForm(formId: string, data: Record<string, any>): void {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) return;

        Object.entries(data).forEach(([key, value]) => {
            const input = form.querySelector(`[id$="${key}"]`) as HTMLInputElement;
            if (input) {
                if (input.type === 'number') {
                    input.value = value?.toString() || '';
                } else {
                    input.value = value || '';
                }
            }
        });
    }

    /**
     * Disable/enable form
     */
    static setFormDisabled(formId: string, disabled: boolean): void {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach((input) => {
            (input as HTMLInputElement).disabled = disabled;
        });
    }

    /**
     * Confirm dialog
     */
    static async confirm(message: string): Promise<boolean> {
        return window.confirm(message);
    }

    /**
     * Scroll to top smoothly
     */
    static scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}