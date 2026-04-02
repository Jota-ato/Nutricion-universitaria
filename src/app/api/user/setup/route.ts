import { formDataType } from '@/app/types';
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NUTRICION_UNIVERSITARIA_SUPABASE_SERVICE_ROLE_KEY!
)

type calculatedStatsType = {
    tdee: number
    bmr: number
    macros: {
        calories: number
        protein: number
        carbs: number
        fat: number
    }
}

export async function POST(request: Request) {
    try {
        const { userId, profileData, calculatedStats }: { userId: string, profileData: formDataType, calculatedStats: calculatedStatsType } = await request.json();
        const { basicData, activityData, goalData } = profileData;

        // 1. Registro en la tabla principal de Usuarios
        const { error: errorUser } = await supabaseAdmin
            .from('Users')
            .upsert({
                id: userId,
                name: basicData.name,
            });
        if (errorUser) throw errorUser;

        // 2. Registro en basic_info (¡IMPORTANTE: incluir user_id!)
        const { error: errorBasic } = await supabaseAdmin
            .from('basic_info')
            .upsert({
                user_id: userId, // Vincula los datos con el usuario
                sex: basicData.sex,
                age: basicData.age,
                height: basicData.height,
                weight: basicData.weight,
            });
        if (errorBasic) throw errorBasic;

        // 3. Registro en activity_info
        const { error: errorActivity } = await supabaseAdmin
            .from('activity_info')
            .upsert({
                user_id: userId,
                occupation: activityData.occupation,
                daily_steps: activityData.dailySteps,
                sessions_per_week: activityData.sessionsPerWeek,
                duration_per_session: activityData.durationPerSession,
                training_intensity: activityData.trainingIntensity,
            });
        if (errorActivity) throw errorActivity;

        // 4. Registro en goal_info
        const { error: errorGoal } = await supabaseAdmin
            .from('goal_info')
            .upsert({
                user_id: userId,
                goal: goalData.goal,
                target_weight: goalData.targetWeight,
                weeks_to_goal: goalData.weeksToGoal,
            });
        if (errorGoal) throw errorGoal;

        const { calories, carbs, fat, protein } = calculatedStats.macros;
        const { error: errorMacros } = await supabaseAdmin
            .from('macros_info')
            .upsert({
                user_id: userId,
                tdee: calculatedStats.tdee,
                bmr: calculatedStats.bmr,
                calories,
                carbs,
                protein,
                fat,
            })
        if (errorMacros) throw errorMacros;
        
        return Response.json({ success: true }, { status: 201 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("ERROR EN SETUP:", error.message);
        return Response.json({ error: error.message }, { status: 500 });
    }
}