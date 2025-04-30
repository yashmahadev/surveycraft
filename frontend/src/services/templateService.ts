import api from './api';
import { Template, TemplateListResponse } from '@/types/form';

class TemplateService {
  async getTemplates(page: number = 1, limit: number = 10): Promise<TemplateListResponse> {
    try {
      const response = await api.get<TemplateListResponse>(
        `/templates?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch templates');
    }
  }

  async getTemplateById(id: number): Promise<Template> {
    try {
      const response = await api.get<Template>(`/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch template');
    }
  }

  async createTemplate(data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<Template> {
    try {
      const response = await api.post<Template>('/templates', data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to create template');
    }
  }

  async updateTemplate(id: number, data: Partial<Template>): Promise<Template> {
    try {
      const response = await api.put<Template>(`/templates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to update template');
    }
  }

  async deleteTemplate(id: number): Promise<void> {
    try {
      await api.delete(`/templates/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to delete template');
    }
  }
}

export const templateService = new TemplateService();
