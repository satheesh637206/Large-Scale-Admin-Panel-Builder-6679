export class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Component API methods
  async getComponents() {
    return this.request('/components');
  }

  async createComponent(component) {
    return this.request('/components', {
      method: 'POST',
      body: JSON.stringify(component),
    });
  }

  async updateComponent(id, component) {
    return this.request(`/components/${id}`, {
      method: 'PUT',
      body: JSON.stringify(component),
    });
  }

  async deleteComponent(id) {
    return this.request(`/components/${id}`, {
      method: 'DELETE',
    });
  }

  // Template API methods
  async getTemplates() {
    return this.request('/templates');
  }

  async createTemplate(template) {
    return this.request('/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async updateTemplate(id, template) {
    return this.request(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(template),
    });
  }

  async deleteTemplate(id) {
    return this.request(`/templates/${id}`, {
      method: 'DELETE',
    });
  }

  // Website API methods
  async getWebsites() {
    return this.request('/websites');
  }

  async createWebsite(website) {
    return this.request('/websites', {
      method: 'POST',
      body: JSON.stringify(website),
    });
  }

  async updateWebsite(id, website) {
    return this.request(`/websites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(website),
    });
  }

  async deleteWebsite(id) {
    return this.request(`/websites/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserWebsite(userId) {
    return this.request(`/websites/user/${userId}`);
  }

  // User API methods
  async getUsers() {
    return this.request('/users');
  }

  async createUser(user) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id, user) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics API methods
  async getAnalytics() {
    return this.request('/analytics');
  }

  async getWebsiteAnalytics(websiteId) {
    return this.request(`/analytics/website/${websiteId}`);
  }

  // Settings API methods
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Authentication API methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();