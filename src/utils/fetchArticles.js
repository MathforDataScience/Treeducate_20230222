
import { supabaseCl } from "../../lib/supabaseClient";

export const fetchArticles = async () => {
    const { data, error } = await supabaseCl
        .from("articles")
        .select("*")
        .limit(10);
    return data;
}

export const fetchArticle = async (capt) => {


    const { data, error } = await supabaseCl
        .from("articles")
        .select("*")
        .eq("title", capt)
        .single();
    return data;
}

