import { auth } from './firebase';

const API_BASE = '/api';

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

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

  async getProfile() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/user/profile`, { headers });
    return response.json();
  },

  async saveBmr(data: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/user/bmr`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async getSwaps() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/swaps`, { headers });
    return response.json();
  },

  async saveSwap(data: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/swaps`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async getPosts(category?: string) {
    const url = category ? `${API_BASE}/posts?category=${category}` : `${API_BASE}/posts`;
    const response = await fetch(url);
    return response.json();
  },

  async createPost(data: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
