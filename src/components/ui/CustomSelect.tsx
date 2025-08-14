import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectRankOption } from '@/types/rank';
import { useMemo } from 'react';

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  formattedRanks: SelectRankOption[];
  placeholder: string;
}

import React from 'react';

const CustomSelect = React.memo(
  ({
    value,
    onValueChange,
    formattedRanks,
    placeholder,
  }: CustomSelectProps) => {
    const items = useMemo(() => {
      return formattedRanks.map((rank) => (
        <SelectItem key={rank?.tier} value={rank?.tier.toString()}>
          <img
            className="h-6 w-6"
            src={rank?.image}
            alt={rank?.name}
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          {rank?.name}
        </SelectItem>
      ));
    }, [formattedRanks]);
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{items}</SelectContent>
      </Select>
    );
  }
);

export default CustomSelect;
