import api from './api';
import { Form, FormResponse, FormSubmissionsResponse } from '@/types/form';

export const formService = {
  async createForm(data: Omit<Form, 'id'>) {
    const response = await api.post<Form>('/forms', data);
    return response.data;
  },

  async getForms(page: number) {
    const response = await api.get<FormResponse>(`/forms?page=${page}`);
    return response.data;
  },

  async getFormById(id: number) {
    const response = await api.get<Form>(`/forms/${id}`);
    return response.data;
  },

  async updateForm(id: number, data: Partial<Form>) {
    const response = await api.put<Form>(`/forms/${id}`, data);
    return response.data;
  },

  async deleteForm(id: number) {
    await api.delete(`/forms/${id}`);
  },

  async publishForm(id: number, isPublished: boolean) {
    const response = await api.put<Form>(`/forms/${id}/publish`, { published: isPublished });
    return response.data;
  },

  async updateCustomSlug(id: number, customSlug: string) {
    const response = await api.put<Form>(`/forms/${id}/slug`, { customSlug });
    return response.data;
  },

  async getFormBySlug(slug: string) {
    const response = await api.get<Form>(`/forms/${slug}`);
    return response.data;
  },

  async submitResponse(formId: string, formData: Record<string, string>) {
    const response = await api.post<Form>(`/forms/${formId}/submit`, {
      responses: formData,
    });
    return response.data;
  },

  async getFormResponses(formId: number, page: number = 1) {
    const response = await api.get<FormSubmissionsResponse>(
      `/forms/${formId}/responses?page=${page}`,
    );
    return response.data;
  },

  async getFormByIdForm(id: number) {
    const response = await api.get<Form>(`/forms/${id}/form`);
    return response.data;
  },
};
