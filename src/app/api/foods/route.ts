import { getFoodsOFF } from "../lib/off";
import { getFoodsUSDA } from "../lib/usda";
import { translateFoodQuery } from "../lib/foodDictionary";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const queryEN = translateFoodQuery(query!);

    if (!query) return Response.json({ error: 'query is required' }, { status: 400 });
    
    const [offResult, usdaResult] = await Promise.allSettled([
        getFoodsOFF(query),
        getFoodsUSDA(queryEN),
    ]);

    const foods = [
        ...(offResult.status === 'fulfilled' ? offResult.value : []),
        ...(usdaResult.status === 'fulfilled' ? usdaResult.value : []),
    ];

    return Response.json(foods);
}