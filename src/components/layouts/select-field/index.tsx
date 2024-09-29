import { Paragraph } from '@/components/ui/paragraph';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import clsx from 'clsx';

interface IFormSelectFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  triggerClassName?: string;
  choices: {
    value: string;
    label: string;
  }[];
}

export const SelectField = ({
  label,
  placeholder,
  description,
  onChange,
  value,
  choices,
  triggerClassName,
  className,
}: IFormSelectFieldProps) => {
  return (
    <div className={className}>
      {label && <Paragraph className="font-medium">{label}</Paragraph>}
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className={clsx('my-2', triggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => {
            return (
              <SelectItem key={choice.value} value={choice.value}>
                {choice.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {description && (
        <Paragraph className="text-xs text-muted-foreground">
          {description}
        </Paragraph>
      )}
    </div>
  );
};
