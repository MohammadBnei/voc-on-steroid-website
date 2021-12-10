import { LoggerUtils } from '$lib/utils';
import { toast } from '$lib/shared/ui/components/toast';

export interface AssocWord {
    word: string;
    created: Date;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchImageWords(form: FormData): Promise<string[] | Response> {
    try {
        const data = await fetch('/api/ia/image/', { body: form, method: 'POST' });
        toast.push('Succesfully transformed text');
        return await data.json() as string[];
    } catch (error) {
        LoggerUtils.getInstance('Words').error(error);
        return error as Response;
    }
}
