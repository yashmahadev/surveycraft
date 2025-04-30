import { FormFieldType } from '@/common/enums';

export interface FormField {
  id: string;
  label: string;
  type:
    | FormFieldType.Text
    | FormFieldType.Textarea
    | FormFieldType.Number
    | FormFieldType.Email
    | FormFieldType.Radio
    | FormFieldType.Checkbox
    | FormFieldType.Select;
  required: boolean;
  options?: string[];
}

export interface InternalFormField {
  id: number;
  label: string;
  type:
    | FormFieldType.Text
    | FormFieldType.Textarea
    | FormFieldType.Email
    | FormFieldType.Number
    | FormFieldType.Checkbox
    | FormFieldType.Radio
    | FormFieldType.Select;
  required: boolean;
  options?: string[];
}

export interface Form {
  id: number;
  title: string;
  description?: string;
  fields: FormField[];
  isPublished: boolean;
  customSlug?: string;
  totalResponses?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface FormResponse {
  forms: Form[];
  total: number;
  limit: number;
}

export interface FormSubmissionsResponse {
  responses: Responses[];
  form: Form;
}

export interface Responses {
  formId: string;
  answers: Answers[];
  submittedAt: string;
  id: number;
}

export interface Answers {
  question: string;
  answer: string;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  questions: number;
  estimatedTime: number;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateListResponse {
  templates: Template[];
  total: number;
  page: number;
  limit: number;
}
