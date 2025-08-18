import { CustomCard } from './ui/custom-card';
import { Template } from '@/lib/hooks';

interface TemplateItemProps {
  template: Template;
  selected: boolean;
  onSelect: () => void;
}

const TemplateItem = ({ template, selected, onSelect }: TemplateItemProps) => {
  return (
    <CustomCard
      hoverEffect={true}
      gradientBorder={true}
      className={`cursor-pointer ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={onSelect}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
          <div className="text-center bg-black/30 p-1 rounded">
            <h3 className="text-white text-xs font-medium">{template.name}</h3>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

export default TemplateItem;
