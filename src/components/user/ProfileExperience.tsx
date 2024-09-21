import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
// import { updateUserProfile } from 'src/redux/actions/userAction'
// import { AppDispatch, RootState } from 'src/redux/store'
import { z } from 'zod'
import { AppDispatch, RootState } from '../../redux/store'
import { updateProfile } from '../../redux/action/userActions'


const experienceSchema = z.object({
    working: z.boolean().default(false),
    title: z.string()
        .min(1, { message: 'Title is required ' })
        .refine((value) => value.trim().length > 0, {
            message: 'Title cannot be just whitespace',
        }),
    company:  z.string()
    .min(1, { message: 'company name  is required ' })
    .refine((value) => value.trim().length > 0, {
        message: 'name cannot be just whitespace',
    }),
    description: z.string()
        .min(10, { message: 'description is required ' })
        .refine((value) => value.trim().length > 0, {
            message: 'description cannot be just whitespace',
        }),
    year: z.object({
        from: z.date({ required_error: 'Start date is required' }).refine(date => date <= new Date(), {
            message: 'Start date must be in the past'
        }),
        to: z.date({ required_error: 'End date is required' }).refine(date => date <= new Date(), {
            message: 'End date must be in the past'
        }).optional()
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

interface UserAddExperience {
    setOpen: Dispatch<SetStateAction<boolean>>
}


function AddExperience() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild >
                <Plus className='border border-gray-300  h-8 w-8 text-maincolr' onClick={() => setOpen(true)} />
            </AlertDialogTrigger >
            <AlertDialogContent className='max-x-fit max-h-fit bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add experience </AlertDialogTitle>
                    {/* ////! Here is the form component that is under this component */}
                    <AddExperienceForm setOpen={setOpen} />

                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default AddExperience

function AddExperienceForm({ setOpen }: UserAddExperience) {

    const { user: { data } } = useSelector((state: RootState) => state?.user);
    const dispatch: AppDispatch = useDispatch()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            experiences: [
                {
                    title: "",
                    company: "", 
                    description: "",
                    year: {
                        from: undefined,
                        to: undefined
                    },
                }
            ]
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedExperience = values.experiences.map(ed => ({
            ...ed,
            year: {
                from: ed.year.from?.toISOString(),
                to: ed.year.to?.toISOString()
            }
        }));

        const payload: any = {
            experiences: [
                ...data.experiences,
                ...updatedExperience
            ]
        };
        try {
            console.log(payload,'ldfjdldj')
            setOpen(false)
            dispatch(updateProfile(payload)).unwrap()
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 ">

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
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`experiences.${0}.company`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>company name

                            </FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
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
                            <FormMessage className='text-red-600' />
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
                            <FormMessage className='text-red-600' />
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
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                                            field.onChange(valueAsDate);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-600' />
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
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                                            field.onChange(valueAsDate);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-600' />
                            </FormItem>
                        )}
                    />
                </div>

                <AlertDialogCancel onClick={() => setOpen(false)} className="">Cancel</AlertDialogCancel>
                {/* <AlertDialogAction> */}
                <Button type="submit" className='ml-2 bg-maincolr mt-2 p-2 w-20 text-white rounded-md'>Submit</Button>
                {/* </AlertDialogAction> */}

            </form>
        </Form>
    )
}