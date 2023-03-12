
import { supabaseCl } from "../../lib/supabaseClient";

export const fetchArticles = async () => {
    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select("*")
        .limit(12);

    return data;
}
export const fetchBlogPosts_join_UserProfile = async (capt) => {
    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select('*, hub_user_profiles(avatar)')
        .limit(12);
    return data;
}
// -------------------------------------------------------------------------------

export const fetchArticle = async (capt) => {
    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select("*")
        .eq("slug", capt)
        .single();
    return data;
}
export const fetchBlogPost_join_UserProfile = async (capt) => {
    const { data, error } = await supabaseCl
        .from("hub_blogposts")
        .select('*, hub_user_profiles(avatar)')
        .eq("slug", capt)
        .single();
return data;
}



