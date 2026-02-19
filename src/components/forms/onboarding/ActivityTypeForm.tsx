import { UseFormReturn } from "react-hook-form";
import { StepActivityValues } from "../schemas";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ActivityTypeForm({ form }: { form: UseFormReturn<StepActivityValues> }) {
    return (
        <Field>
            <FieldLabel>¿Realizas actividad física?</FieldLabel>
            <Select
                onValueChange={(val) => form.setValue("hasActivity", val)}
                defaultValue={form.getValues("hasActivity")}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Si/no" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="yes">Si</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    );
}