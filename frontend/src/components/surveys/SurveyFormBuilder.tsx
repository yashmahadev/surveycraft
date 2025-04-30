import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, X } from 'lucide-react';
import { FormFieldType } from '@/common/enums';

interface FormField {
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

interface InternalFormField extends FormField {
  id: number;
}

interface SurveyFormBuilderProps {
  readonly initialTitle?: string;
  readonly initialDescription?: string;
  readonly initialFields?: FormField[];
  readonly onSave?: (data: { title: string; description: string; fields: FormField[] }) => void;
}

export function SurveyFormBuilder({
  initialTitle = '',
  initialDescription = '',
  initialFields = [],
  onSave,
}: SurveyFormBuilderProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [fields, setFields] = useState<InternalFormField[]>(
    initialFields.map((field, index) => ({ ...field, id: index })),
  );

  const handleFieldChange = (
    id: number,
    key: keyof FormField,
    value: string | boolean | string[],
  ) => {
    setFields(fields.map(field => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const handleOptionChange = (fieldId: string, optionIndex: number, value: string) => {
    setFields(
      fields.map(field => {
        if (field.id === Number(fieldId) && field.options) {
          const newOptions = [...field.options];
          newOptions[optionIndex] = value;
          return { ...field, options: newOptions };
        }
        return field;
      }),
    );
  };

  const addOption = (fieldId: string) => {
    setFields(
      fields.map(field => {
        if (field.id === Number(fieldId)) {
          const options = field.options || [];
          return { ...field, options: [...options, ''] };
        }
        return field;
      }),
    );
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    setFields(
      fields.map(field => {
        if (field.id === Number(fieldId) && field.options) {
          const newOptions = field.options.filter((_, index) => index !== optionIndex);
          return { ...field, options: newOptions };
        }
        return field;
      }),
    );
  };

  const addField = () => {
    const newField: FormField = {
      label: '',
      type: FormFieldType.Text,
      required: false,
    };
    setFields([...fields, { ...newField, id: Date.now() }]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    if (onSave) {
      const formData = {
        title,
        description,
        fields: fields.map(({ id, ...field }) => field),
      };
      onSave(formData);
    }
  };

  const fieldTypesWithOptions = [FormFieldType.Select, FormFieldType.Checkbox, FormFieldType.Radio];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Survey Title</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter survey title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter survey description"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Form Fields</h2>
          <Button onClick={addField} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>

        {fields.map(field => (
          <Card key={field.id} className="relative">
            <CardContent className="pt-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeField(field.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Field Label</Label>
                  <Input
                    value={field.label}
                    onChange={e => handleFieldChange(field.id, 'label', e.target.value)}
                    placeholder="Enter field label"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={value => handleFieldChange(field.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={FormFieldType.Text}>Text</SelectItem>
                      <SelectItem value={FormFieldType.Textarea}>Textarea</SelectItem>
                      <SelectItem value={FormFieldType.Email}>Email</SelectItem>
                      <SelectItem value={FormFieldType.Number}>Number</SelectItem>
                      <SelectItem value={FormFieldType.Checkbox}>Checkbox</SelectItem>
                      <SelectItem value={FormFieldType.Radio}>Radio</SelectItem>
                      <SelectItem value={FormFieldType.Select}>Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {fieldTypesWithOptions.includes(field.type) && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {(field.options || []).map((option, optIdx) => (
                        <div key={optIdx} className="flex gap-2">
                          <Input
                            value={option}
                            onChange={e =>
                              handleOptionChange(field.id.toString(), optIdx, e.target.value)
                            }
                            placeholder={`Option ${optIdx + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(field.id.toString(), optIdx)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(field.id.toString())}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`required-${field.id}`}
                    checked={field.required}
                    onCheckedChange={checked => handleFieldChange(field.id, 'required', checked)}
                  />
                  <Label htmlFor={`required-${field.id}`}>Required field</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Survey
      </Button>
    </div>
  );
}
