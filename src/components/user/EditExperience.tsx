import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog"
import { Checkbox } from "../../components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { AppDispatch, RootState } from "../../redux/store";
import { updateProfile } from "../../redux/action/userActions";
import { CustomButton } from "../common/Button";

interface UserEditExperience {
  setOpen: Dispatch<SetStateAction<boolean>>,
  ind: number
}


const experienceSchema = z.object({
  working: z.boolean(),
  title: z.string().nonempty({ message: 'title is required' }),
  company: z.string().nonempty({ message: 'company name is required' }),
  description: z.string().nonempty({ message: 'description is required' }),
  year: z.object({
    from: z.date({ required_error: 'Start date is required' }).refine(date => date <= new Date(), {
      message: 'Start date must be in the past'
    }),
    to: z.preprocess(arg => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date({ required_error: 'End date is required' }).refine(date => date <= new Date(), {
      message: 'End date must be in the past',
    }).optional())
  }).refine(data => {
    if (data.to) {
      return data.from <= data.to;
    }
    return true;
  }, {
    message: 'Start date must be before or equal to the end date',
    path: ['from']
  })
}).refine(data => {
  if (data.working) {
    return true; // If working is true, no need to check 'to' date
  }
  return data.year.to !== undefined; // If not working, 'to' date must be provided
}, {
  message: 'End date is required when not currently working',
  path: ['year', 'to']
});

const formSchema = z.object({
  experiences: z.array(experienceSchema)
})

function EditExperience({ ind }: { ind: number }) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild >
        <Edit className="border border-gray-300  h-8 w-8 text-maincolr" onClick={() => setOpen(true)} />
      </AlertDialogTrigger >
      <AlertDialogContent className='max-x-fit max-h-fit bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>Social links </AlertDialogTitle>

          {/* ////! Here is the form component that is under this component */}
          <EditEducationForm setOpen={setOpen} ind={ind} />

        </AlertDialogHeader>
        <AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  )
}

export default EditExperience

function EditEducationForm({ setOpen, ind }: UserEditExperience) {

  const {user:{data}} = useSelector((state: RootState) => state?.user);

  const dispatch: AppDispatch = useDispatch()
  const toDate = data?.experiences?.[ind]?.year?.to
    ? new Date(data?.experiences?.[ind]?.year?.to)
    : undefined;
  const fromDate = data?.experiences?.[ind]?.year?.from
    ? new Date(data?.experiences?.[ind]?.year?.from)
    : undefined;
  console.log(fromDate,'formdatae')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: [
        {
          working: data?.experiences?.[ind]?.working,
          title: data?.experiences?.[ind]?.title,
          company: data?.experiences?.[ind]?.company,
          description: data?.experiences?.[ind]?.description,
          year: {
            from: fromDate || undefined,
            to: toDate || undefined,
          },
        }
      ]
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedEducation = values.experiences.map(ex => ({
      ...ex,
      year: {
        from: ex.year.from?.toISOString(),
        to: ex.year.to?.toISOString()
      }
    }));

    const payload = {
      experiences: data?.experiences?.map((data:any, index:number) => {
        return index == ind ? updatedEducation[0] : data
      })
    };
    try {
      dispatch(updateProfile(payload)).unwrap()
      // toast.success('experience updated succesfully', { position: 'top-center' })
      setOpen(false)
    } catch (error: any) {
      console.log(error)
      // toast.error(error?.message, { position: 'top-center' })
      setOpen(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name={`experiences.${0}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>title
              </FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`experiences.${0}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel> company name </FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`experiences.${0}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>description

              </FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`experiences.${0}.working`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>description

              </FormLabel>
              <FormControl>
                <div>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Currently working in this role
                  </label>
                </div>
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name={`experiences.${0}.year.from`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>from

                </FormLabel>
                <br />
                <FormControl>
                  <input
                    className='border border-solid border-gray-400'
                    type='date'
                    value={field?.value ? new Date(field.value).toISOString().slice(0, 10) : ''}
                    onChange={(e) => {
                      const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                      field.onChange(valueAsDate);
                    }}
                  />
                </FormControl>
                 <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`experiences.${0}.year.to`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>to

                </FormLabel>
                <br />
                <FormControl>
                  <input
                    className='border border-solid border-gray-400'
                    type='date'
                    value={field?.value ? new Date(field.value).toISOString().slice(0, 10) : ''}
                    onChange={(e) => {
                      const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                      field.onChange(valueAsDate);
                    }}
                  />
                </FormControl>
                 <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <AlertDialogCancel onClick={() => setOpen(false)} className="">Cancel</AlertDialogCancel>
        <CustomButton text='Submit' type='submit'   />
      </form>
    </Form>
  )
}


