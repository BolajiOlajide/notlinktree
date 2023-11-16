import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        name: 'Bolaji'
    };
}) satisfies PageServerLoad;