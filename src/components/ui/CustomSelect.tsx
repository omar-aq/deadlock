import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectRankOption } from '@/types/rank';

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  formattedRanks: SelectRankOption[];
  placeholder: string;
}

const CustomSelect = ({
  value,
  onValueChange,
  formattedRanks,
  placeholder,
}: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {formattedRanks.map((rank) => (
          <SelectItem key={rank?.tier} value={rank?.tier.toString()}>
            <img className="h-6 w-6" src={rank?.image} alt={rank?.name} />
            {rank?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
