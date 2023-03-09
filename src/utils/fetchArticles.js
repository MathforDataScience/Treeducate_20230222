
import { supabaseCl } from "../../lib/supabaseClient";

export const fetchArticles = async () => {
    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select("*")
        .limit(18);

    return data;
}

export const fetchArticle = async (capt) => {


    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select("*")
        .eq("slug", capt)
        .single();
    return data;
}

