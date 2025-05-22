const API_URL = 'http://localhost:5064/api';

export interface Customer {
  id: number;
  name: string;
  note?: string;
  organizationNumber?: string;
  createdAt: string;
  industryCode?: string;
  industryDescription?: string;
}

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) {
      throw new Error('Kunne ikke hente kunder');
    }
    return response.json();
  },

  // lagre kunde

  async createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const response = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error('Kunne ikke opprette kunde');
    }
    return response.json();
  },

  // slette kunde

  async deleteCustomer(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Kunne ikke slette kunde');
    }
  }
}; 