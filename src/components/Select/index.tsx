import { Select as SelectRadix } from 'radix-ui';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Button from '../Button';

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder: string;
  options?: { value: string; label: string }[];
};

export default function Select({
  value,
  onValueChange,
  options,
  placeholder,
}: SelectProps) {
  return (
    <SelectRadix.Root value={value} onValueChange={onValueChange}>
      <SelectRadix.Trigger asChild>
        <Button className="bg-[#0E0E10]! focus:border-[#5f5e72]! duration-200 gap-2 px-3.5 py-2 rounded-lg w-full relative flex-auto whitespace-nowrap overflow-hidden text-ellipsis">
          <SelectRadix.Value
            placeholder={placeholder}
            className="whitespace-nowrap"
          />
          <SelectRadix.Icon>
            <div className="bg-[#0E0E10] absolute right-0 transform -translate-y-1/2 size-7 flex items-center justify-center pr-2">
              <BsChevronDown className="h-auto w-3" />
            </div>
          </SelectRadix.Icon>
        </Button>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content className="bg-card-bg text-body-text-muted cursor-pointer border border-secondary rounded-lg overflow-hidden">
          <SelectRadix.ScrollDownButton className="size-5 w-full flex items-center justify-center">
            <BsChevronUp />
          </SelectRadix.ScrollDownButton>

          <SelectRadix.Viewport>
            {options?.map((option) => (
              <SelectRadix.Item
                key={option.value}
                value={option.value}
                className="px-3.5 py-2 hover:bg-[#2b2a2c] active:bg-[#373638] outline-0"
              >
                <SelectRadix.ItemText>{option.label}</SelectRadix.ItemText>
              </SelectRadix.Item>
            ))}
          </SelectRadix.Viewport>

          <SelectRadix.ScrollDownButton className="size-5 w-full flex items-center justify-center">
            <BsChevronDown />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
}
