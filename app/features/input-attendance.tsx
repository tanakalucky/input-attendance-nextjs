'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMutation } from 'urql';
import { z } from 'zod';

const formSchema = z.object({
  targetYear: z.coerce.number({
    message: 'Please select a year',
  }),
  targetMonth: z.coerce.number({
    message: 'Please select a year',
  }),
});

const inputAttendanceMutation = `
  mutation InputAttendance($targetYear: Int!, $targetMonth: Int!) {
    inputAttendance(targetYear: $targetYear, targetMonth: $targetMonth)
  }
`;

const years: number[] = [];
const thisYear = new Date().getFullYear();
for (let year = thisYear - 1; year <= thisYear + 1; year++) {
  years.push(year);
}

const months: number[] = [];
for (let month = 1; month <= 12; month++) {
  months.push(month);
}

export function InputAttendance() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [result, inputAttendance] = useMutation(inputAttendanceMutation);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(
      () =>
        inputAttendance(values).then((result) => {
          if (result.error) {
            throw new Error(result.error.message);
          }
        }),
      {
        loading: 'In progress...',
        success: 'Input attendance completed!',
        error: 'Failed to input attendance',
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-8 w-[90%] md:w-[50%] lg:w-[30%] mx-auto mt-10'
      >
        <FormField
          control={form.control}
          name='targetYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a year' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='targetMonth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a month' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={result.fetching}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
