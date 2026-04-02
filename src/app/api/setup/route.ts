/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'
import { formDataType } from '@/app/types';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NUTRICION_UNIVERSITARIA_SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
    try {
        const { userId, profileData }: { userId: string, profileData: formDataType } = await request.json();
        const { basicData, activityData, goalData } = profileData;

        const { error: userError } = await supabaseAdmin
            .from('Users')
            .upsert({
                id: userId,
                name: basicData.name,
            });
        if (userError) throw userError;

        const { error: basicError } = await supabaseAdmin
            .from('basic_info')
            .upsert({
                user_id: userId,
                sex: basicData.sex,
                age: basicData.age,
                height: basicData.height,
                weight: basicData.weight,
            });
        if (basicError) throw basicError;

        const { error: activityError } = await supabaseAdmin
            .from('activity_info')
            .upsert({
                user_id: userId,
                occupation: activityData.occupation,
                daily_steps: activityData.dailySteps,
                sessions_per_week: activityData.sessionsPerWeek,
                duration_per_session: activityData.durationPerSession,
                training_intensity: activityData.trainingIntensity,
            });
        if (activityError) throw activityError;

        const { error: goalError } = await supabaseAdmin
            .from('goal_info')
            .upsert({
                user_id: userId,
                goal: goalData.goal,
                target_weight: goalData.targetWeight,
                weeks_to_goal: goalData.weeksToGoal,
            });
        if (goalError) throw goalError;

        return Response.json({ success: true }, { status: 201 });

    } catch (error: any) {
        console.error("Error en el setup del usuario:", error.message);
        return Response.json({ error: error.message }, { status: 500 });
    }
}