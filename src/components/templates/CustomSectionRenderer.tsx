import { CustomSection } from '../../types/resume';

interface CustomSectionRendererProps {
  sections: CustomSection[];
  headerClassName?: string;
  itemClassName?: string;
}

export default function CustomSectionRenderer({
  sections,
  headerClassName = "text-xl font-bold mb-3",
  itemClassName = "space-y-4"
}: CustomSectionRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        section.items.length > 0 && (
          <section key={section.id}>
            <h2 className={headerClassName}>
              {section.title}
            </h2>
            <div className={itemClassName}>
              {section.items.map((item) => (
                <div key={item.id}>
                  {section.fields.map((field) => (
                    item[field.name] && (
                      <div key={field.id} className={field.type === 'textarea' ? 'mb-2' : ''}>
                        {field.type === 'textarea' ? (
                          <p className="text-gray-700 whitespace-pre-line">{item[field.name]}</p>
                        ) : (
                          <p className="text-gray-900">
                            <span className="font-semibold">{field.label}:</span>{' '}
                            <span className="text-gray-700">{item[field.name]}</span>
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </>
  );
}
