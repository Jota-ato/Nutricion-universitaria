import { UseFormReturn } from "react-hook-form";
import { StepActivityValues } from "../schemas";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ActivityLevelForm({ form }: { form: UseFormReturn<StepActivityValues> }) {
  return (
    <Field>
      <FieldLabel>Nivel de actividad diaria</FieldLabel>
      <Select 
        onValueChange={(val) => form.setValue("activityLevel", val)} 
        defaultValue={form.getValues("activityLevel")}
      >
        <SelectTrigger><SelectValue placeholder="Selecciona tu nivel" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="sedentary">Sedentario (Oficina/Estudio)</SelectItem>
          <SelectItem value="light">Ligero (Caminar un poco)</SelectItem>
          <SelectItem value="moderate">Moderado (Trabajo activo)</SelectItem>
          <SelectItem value="heavy">Pesado (Construcción/Deporte intenso)</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}