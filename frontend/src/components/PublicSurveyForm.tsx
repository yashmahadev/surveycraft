import { useState } from 'react';
import { FormField } from '../services/formService';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

type FormData = Record<string, string | string[]>;

interface PublicSurveyFormProps {
  fields: FormField[];
  onSubmit: (data: FormData) => void;
}

export function PublicSurveyForm({ fields, onSubmit }: PublicSurveyFormProps) {
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const renderField = (field: FormField) => {
    const fieldKey = `field-${field.id}-${field.type}`;

    switch (field.type) {
      case 'text':
        return (
          <Input
            key={fieldKey}
            id={field.id}
            value={(formData[field.id] as string) || ''}
            onChange={e => handleInputChange(field.id, e.target.value)}
            required={field.required}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case 'textarea':
        return (
          <Textarea
            key={fieldKey}
            id={field.id}
            value={(formData[field.id] as string) || ''}
            onChange={e => handleInputChange(field.id, e.target.value)}
            required={field.required}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Select
            key={fieldKey}
            value={(formData[field.id] as string) || ''}
            onValueChange={value => handleInputChange(field.id, value)}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={`option-${field.id}-${option}`} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'radio':
        return (
          <RadioGroup
            key={fieldKey}
            value={(formData[field.id] as string) || ''}
            onValueChange={value => handleInputChange(field.id, value)}
            required={field.required}
            className="space-y-2"
          >
            {field.options?.map(option => (
              <div key={`radio-${field.id}-${option}`} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div key={fieldKey} className="space-y-2">
            {field.options?.map(option => (
              <div key={`checkbox-${field.id}-${option}`} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={((formData[field.id] as string[]) || []).includes(option)}
                  onCheckedChange={checked => {
                    const currentValues = (formData[field.id] as string[]) || [];
                    const newValues = checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleInputChange(field.id, newValues);
                  }}
                />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field, index) => (
        <div key={`form-field-${field.id}-${index}`} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
