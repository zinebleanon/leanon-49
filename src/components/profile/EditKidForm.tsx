
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EditKidFormProps {
  kidIndex?: number; // Undefined for new kid
  onSuccess: () => void;
}

const kidFormSchema = z.object({
  birthDate: z.date({ required_error: "Birth date is required." }),
  gender: z.string({ required_error: "Gender is required." }).min(1, "Gender is required."),
});

type KidFormValues = z.infer<typeof kidFormSchema>;

const EditKidForm = ({ kidIndex, onSuccess }: EditKidFormProps) => {
  const { userInfo, updateKid, addKid } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  );
  
  const isNewKid = kidIndex === undefined;
  const existingKid = !isNewKid && userInfo?.kids?.[kidIndex];
  
  let defaultValues: Partial<KidFormValues> = {
    gender: existingKid?.gender || '',
  };
  
  if (existingKid?.birthDate) {
    try {
      const date = new Date(existingKid.birthDate);
      defaultValues.birthDate = date;
      setSelectedYear(date.getFullYear().toString());
      setSelectedMonth((date.getMonth() + 1).toString().padStart(2, '0'));
    } catch (error) {
      console.error('Error parsing birth date:', error);
    }
  }

  const form = useForm<KidFormValues>({
    resolver: zodResolver(kidFormSchema),
    defaultValues,
  });

  // Generate years array (from 18 years ago to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 19 }, (_, i) => 
    (currentYear - 18 + i).toString()
  );

  // Generate months array
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];
  
  const onSubmit = async (data: KidFormValues) => {
    setIsLoading(true);
    
    try {
      const formattedData = {
        birthDate: data.birthDate.toISOString(),
        gender: data.gender
      };
      
      let success = false;
      
      if (isNewKid) {
        success = addKid(formattedData);
      } else if (kidIndex !== undefined) {
        success = updateKid(kidIndex, formattedData);
      }
      
      if (success) {
        toast({
          title: isNewKid ? "Kid added" : "Kid updated",
          description: isNewKid 
            ? "A new child has been added to your profile."
            : "Your child's information has been updated successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Update failed",
          description: "There was a problem updating the information. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating kid info:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating the information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const newDate = new Date(parseInt(year), parseInt(selectedMonth) - 1, 1);
    form.setValue('birthDate', newDate, { shouldValidate: true });
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const newDate = new Date(parseInt(selectedYear), parseInt(month) - 1, 1);
    form.setValue('birthDate', newDate, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Birth Date</FormLabel>
              <div className="flex gap-2 mb-2">
                <Select value={selectedMonth} onValueChange={handleMonthChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={handleYearChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MMMM d, yyyy")
                      ) : (
                        <span>Select day</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    month={new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1)}
                    defaultMonth={new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1)}
                    disabled={(date) => {
                      const today = new Date();
                      const eighteenYearsAgo = new Date(today);
                      eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
                      return date > today || date < eighteenYearsAgo;
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                Select your child's birth date (up to 18 years ago)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Boy</SelectItem>
                  <SelectItem value="female">Girl</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isNewKid ? "Add Child" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditKidForm;
