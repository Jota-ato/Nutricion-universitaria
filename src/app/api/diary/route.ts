import { createClient } from '@supabase/supabase-js'
import { Food, mealType } from "@/app/types";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // La URL pública está bien
    process.env.NUTRICION_UNIVERSITARIA_SUPABASE_SERVICE_ROLE_KEY! // La llave secreta
)

interface dataType {
    food: Food
    amount: number
    userId: string
    foodType: mealType
}

export async function POST(request: Request) {
    const data = await request.json();
    const { food, amount, userId, foodType }: dataType = data;

    if (!food || !amount || !userId) {
        return Response.json({ error: 'Faltan datos' }, { status: 400 });
    }

    try {
        // If we have this food already we just insert it
        const { data: existingFood } = await supabaseAdmin
            .from('foods')
            .select('id')
            .eq('external_id', food.id)
            .single();

        let foodUuid = existingFood?.id;

        // If it's not in the db we insert it in foods first
        if (!foodUuid) {
            const { data: newFood, error: insertError } = await supabaseAdmin
                .from('foods')
                .insert({
                    name: food.name,
                    brand: food.brand,
                    calories: food.calories,
                    protein: food.protein,
                    carbs: food.carbs,
                    fat: food.fat,
                    base_portion: food.base_portion,
                    base_portion_unit: food.unit,
                    source: food.source,
                    external_id: food.id
                })
                .select()
                .single();

            if (insertError) throw insertError;
            foodUuid = newFood.id;
        }

        const { error: diaryError } = await supabaseAdmin
            .from('food_diary')
            .insert({
                user_id: userId,
                food_id: foodUuid,
                amount_eated: amount,
                food_type: foodType,
                eated_date: new Date().toISOString().split('T')[0]
            });

        if (diaryError) throw diaryError;

        return Response.json({ success: true }, { status: 201 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("DETALLE DEL ERROR:", err); // Esto aparecerá en tu terminal de VS Code
        return Response.json({
            error: 'Error interno',
            message: err.message,
            details: err.details
        }, { status: 500 });
    }
}