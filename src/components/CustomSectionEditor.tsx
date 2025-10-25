import { useState } from 'react';
import { CustomSection, CustomField, CustomSectionItem } from '../types/resume';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface CustomSectionEditorProps {
  section: CustomSection;
  onUpdate: (section: CustomSection) => void;
  onRemove: () => void;
}

export default function CustomSectionEditor({ section, onUpdate, onRemove }: CustomSectionEditorProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingFields, setIsEditingFields] = useState(false);
  const [tempTitle, setTempTitle] = useState(section.title);
  const [tempFields, setTempFields] = useState<CustomField[]>(section.fields);

  const saveTitle = () => {
    onUpdate({ ...section, title: tempTitle });
    setIsEditingTitle(false);
  };

  const cancelTitleEdit = () => {
    setTempTitle(section.title);
    setIsEditingTitle(false);
  };

  const addField = () => {
    setTempFields([
      ...tempFields,
      {
        id: Date.now().toString(),
        name: `field_${tempFields.length + 1}`,
        label: '',
        type: 'text'
      }
    ]);
  };

  const updateField = (id: string, key: string, value: string) => {
    setTempFields(tempFields.map(field =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const removeField = (id: string) => {
    setTempFields(tempFields.filter(field => field.id !== id));
  };

  const saveFields = () => {
    onUpdate({ ...section, fields: tempFields });
    setIsEditingFields(false);
  };

  const cancelFieldsEdit = () => {
    setTempFields(section.fields);
    setIsEditingFields(false);
  };

  const addItem = () => {
    const newItem: CustomSectionItem = { id: Date.now().toString() };
    section.fields.forEach(field => {
      newItem[field.name] = '';
    });
    onUpdate({ ...section, items: [...section.items, newItem] });
  };

  const updateItem = (itemId: string, fieldName: string, value: string) => {
    onUpdate({
      ...section,
      items: section.items.map(item =>
        item.id === itemId ? { ...item, [fieldName]: value } : item
      )
    });
  };

  const removeItem = (itemId: string) => {
    onUpdate({
      ...section,
      items: section.items.filter(item => item.id !== itemId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="px-3 py-1 border border-slate-300 rounded text-xl font-bold focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                autoFocus
              />
              <button onClick={saveTitle} className="text-green-600 hover:text-green-700">
                <Check className="w-5 h-5" />
              </button>
              <button onClick={cancelTitleEdit} className="text-red-600 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="text-slate-600 hover:text-slate-900"
                title="Click to rename this section"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        {!isEditingTitle && (
          <p className="text-xs text-slate-500 -mt-4 mb-2">
            💡 Tip: Click the pencil icon above to rename this section
          </p>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingFields(true)}
            className="text-sm px-3 py-1 text-slate-600 hover:text-slate-900 border border-slate-300 rounded hover:border-slate-400 transition-colors"
          >
            Edit Fields
          </button>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
          <button
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 p-2"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isEditingFields && (
        <div className="p-6 bg-slate-50 border border-slate-300 rounded-lg space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Configure Fields</h3>
            <div className="flex gap-2">
              <button
                onClick={saveFields}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={cancelFieldsEdit}
                className="flex items-center gap-2 px-3 py-1 bg-slate-300 text-slate-700 rounded hover:bg-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>

          {tempFields.map((field) => (
            <div key={field.id} className="flex items-center gap-3 bg-white p-3 rounded border border-slate-200">
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(field.id, 'label', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(field.id, 'type', e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="date">Date</option>
              </select>
              <button
                onClick={() => removeField(field.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addField}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 border border-dashed border-slate-300 rounded hover:border-slate-400 transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>
      )}

      {section.items.map((item) => (
        <div key={item.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.id} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                {field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.label}
                    value={item[field.name] || ''}
                    onChange={(e) => updateItem(item.id, field.name, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.label}
                    value={item[field.name] || ''}
                    onChange={(e) => updateItem(item.id, field.name, e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
