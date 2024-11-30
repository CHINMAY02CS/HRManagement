import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

//Type of Form Fields
// 1. Based on field type - email, mobile, password, country select, state select, city select, avg daily order select
// 2. Based on Field Label

interface FormFieldProps {
  type: string;
  name: string;
  className?: string;
  form: any;
  label: string;
  required?: boolean;
  disabled?: boolean;
  selectValues?: any;
}

interface SelectItemType {
  key: string;
  value: string;
}

export default function FormFields({
  type,
  name,
  className = "",
  form,
  label,
  disabled,
  selectValues = [],
  required = false,
}: FormFieldProps) {
  switch (type) {
    case "text":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem className={className}>
                <FormLabel>
                  {label}
                  {required && <RequiredField />}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Enter ${label} . . .`}
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    case "email":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder="Enter Email ID . . ."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "mobile":
      return (
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <FormControl>
                <div className="flex flex-row">
                  <div className="flex items-center h-10 border border-r-0 border-input rounded-l-md w-14">
                    <span className="px-3 my-3 text-sm border-r border-input">
                      +91
                    </span>
                  </div>
                  <Input
                    type="tel"
                    className="border-l-0 rounded-l-none"
                    placeholder="XXXX XXX XXX"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "password":
      const [visible, setVisible] = useState(false);
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <div className="flex items-end">
                <FormControl>
                  <Input
                    type={visible ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Type here . . ."
                    {...field}
                  />
                </FormControl>
                {visible ? (
                  <Eye
                    className="self-center w-5 h-5 -ml-10 cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <EyeOff
                    className="self-center w-5 h-5 -ml-10 cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "textarea":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type here . . ."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={className} disabled={disabled}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectValues.map((item: SelectItemType) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "date-picker":
      const [isPopOverOpen, setIsPopOverOpen] = useState(false);
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} {required && <RequiredField />}
              </FormLabel>
              <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? field.value : <span>Pick a date</span>}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value?.toISOString());
                      setIsPopOverOpen(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "number":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem className={className}>
                <FormLabel>
                  {label} {required && <RequiredField />}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Enter ${label} . . .`}
                    min="1.0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    default:
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {label} {required && <RequiredField />}
                </FormLabel>
                <FormControl>
                  <Input
                    type={type}
                    placeholder={`Enter ${label} . . .`}
                    {...field}
                    className={className}
                    disabled={disabled ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
  }
}

export const RequiredField = () => <span className="ml-1 text-red">*</span>;
