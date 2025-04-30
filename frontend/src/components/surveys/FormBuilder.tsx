import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import { Switch } from '@/components/ui/switch';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  value?: string | string[] | number;
}

interface FormBuilderProps {
  fields: FormField[];
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
  onFieldValueChange?: (id: string, value: string | string[] | number) => void;
  errors?: Record<string, string>;
}

const Field = memo(
  ({
    field,
    onValueChange,
    error,
  }: {
    field: FormField;
    onValueChange: (value: string | string[] | number) => void;
    error?: string;
  }) => {
    const fieldOptions = field.options || [];

    switch (field.type) {
      case 'text':
        return (
          <Input
            id={field.id.toString()}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={(field.value as string) || ''}
            onChange={e => onValueChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={field.id.toString()}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={(field.value as string) || ''}
            onChange={e => onValueChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
      case 'email':
        return (
          <Input
            id={field.id.toString()}
            type="email"
            placeholder="Enter email"
            value={(field.value as string) || ''}
            onChange={e => onValueChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
      case 'number':
        return (
          <Input
            id={field.id.toString()}
            type="number"
            placeholder="Enter number"
            value={(field.value as string) || ''}
            onChange={e => onValueChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {fieldOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${index}`}
                  checked={((field.value as string[]) || []).includes(option)}
                  onCheckedChange={checked => {
                    const currentValues = (field.value as string[]) || [];
                    const newValues = checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    onValueChange(newValues);
                  }}
                />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            <RadioGroup value={field.value as string} onValueChange={onValueChange}>
              {fieldOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 'select':
        return (
          <Select value={field.value as string} onValueChange={onValueChange}>
            <SelectTrigger id={field.id.toString()} className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  },
);

export const FormBuilder = ({
  fields,
  onRemoveField,
  onUpdateField,
  onFieldValueChange,
  errors = {},
}: FormBuilderProps) => {
  const [optionsMap, setOptionsMap] = useState<Record<string, string[]>>({});
  const [newOption, setNewOption] = useState<Record<string, string>>({});

  const handleAddOption = useCallback(
    (fieldId: string) => {
      if (!newOption[fieldId]?.trim()) return;

      setOptionsMap(prev => ({
        ...prev,
        [fieldId]: [...(prev[fieldId] || []), newOption[fieldId]],
      }));

      const field = fields.find(f => f.id === fieldId);
      if (field) {
        const updatedOptions = [
          ...(optionsMap[fieldId] || field.options || []),
          newOption[fieldId],
        ];
        onUpdateField(fieldId, { options: updatedOptions });
      }

      setNewOption(prev => ({ ...prev, [fieldId]: '' }));
    },
    [fields, newOption, onUpdateField, optionsMap],
  );

  const handleRemoveOption = useCallback(
    (fieldId: string, optionIndex: number) => {
      const field = fields.find(f => f.id === fieldId);
      if (field) {
        const currentOptions = optionsMap[fieldId] || field.options || [];
        const updatedOptions = currentOptions.filter((_, index) => index !== optionIndex);

        setOptionsMap(prev => ({
          ...prev,
          [fieldId]: updatedOptions,
        }));

        onUpdateField(fieldId, { options: updatedOptions });
      }
    },
    [fields, onUpdateField, optionsMap],
  );

  const handleToggleRequired = useCallback(
    (fieldId: string, checked: boolean) => {
      onUpdateField(fieldId, { required: checked });
    },
    [onUpdateField],
  );

  const handleInputChange = useCallback(
    (fieldId: string, value: string | string[] | number) => {
      if (onFieldValueChange) {
        onFieldValueChange(fieldId, value);
      }
    },
    [onFieldValueChange],
  );

  const renderField = useCallback(
    (field: FormField) => {
      const fieldError = errors[field.id];

      return (
        <div key={field.id} className="group relative space-y-2 p-4 border rounded-md bg-white">
          <div className="flex items-start justify-between mb-2">
            <div className="space-y-2 w-full pr-8">
              <Label htmlFor={field.id.toString()} className="font-medium text-lg">
                {field.label}
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`required-${field.id}`}
                  checked={field.required}
                  onCheckedChange={checked => handleToggleRequired(field.id.toString(), checked)}
                />
                <Label htmlFor={`required-${field.id}`}>Required</Label>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveField(field.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Field
            field={field}
            onValueChange={value => handleInputChange(field.id.toString(), value)}
            error={fieldError}
          />
          {fieldError && <p className="text-sm text-red-500 mt-1">{fieldError}</p>}
        </div>
      );
    },
    [errors, handleInputChange, handleToggleRequired, onRemoveField],
  );

  return (
    <Card className="p-6 min-h-[400px]">
      {fields.length > 0 ? (
        <div className="space-y-4">{fields.map(renderField)}</div>
      ) : (
        <div className="text-center text-muted-foreground">
          Click on form fields to add them here
        </div>
      )}
    </Card>
  );
};
