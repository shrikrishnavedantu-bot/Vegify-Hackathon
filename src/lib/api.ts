const API_BASE = '/api';

export const api = {
  async identifyDish(imageBase64: string) {
    const response = await fetch(`${API_BASE}/identify-dish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });
    return response.json();
  },

  async generateVegan(dishName: string, animalProduct: string) {
    const response = await fetch(`${API_BASE}/generate-vegan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dishName, animalProduct })
    });
    return response.json();
  },

  // Mocked for guest mode (local storage handled in components)
  async getProfile() { return { error: "Guest mode enabled" }; },
  async saveBmr(data: any) { return { success: true }; },
  async getSwaps() { return []; },
  async saveSwap(data: any) { return { success: true }; },
  async getPosts() { return []; },
  async createPost(data: any) { return { success: true }; }
};
