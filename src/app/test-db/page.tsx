import { createClient } from '@supabase/supabase-js'

// Next.js forzará esta página a renderizarse dinámicamente en el servidor
export const dynamic = 'force-dynamic';

export default async function TestDatabasePage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from('Test')
        .select('*');

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-slate-800">Prueba de Conexión Supabase</h1>

                {error ? (
                    <div className="text-red-700 bg-red-100 p-4 rounded-md">
                        <p className="font-semibold">Hubo un error de conexión:</p>
                        <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(error, null, 2)}</pre>
                    </div>
                ) : (
                    <div className="text-green-800 bg-green-100 p-4 rounded-md">
                        <p className="font-semibold">¡Datos recibidos!</p>
                        <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </main>
    );
}