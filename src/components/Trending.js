// import React from "react";
import Head from 'next/head';
import { useEffect, useState } from "react";
// import { BiTrendingUp } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { articlesState } from "../../atoms/articleAtom";

import { fetchArticles } from "../utils/fetchArticles";

import TimeAgo              from "react-timeago";
import deStrings            from "react-timeago/lib/language-strings/de";
import buildFormatter       from "react-timeago/lib/formatters/buildFormatter";
import dayjs                from "dayjs";

// import { Container, Grid, Stack, Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';


import { useSettingsContext } from './settings';

// import { supabaseCl } from '../../lib/supabaseClient';
import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';
// import { ColorSinglePicker } from './color-utils';

import BlogPostItemOne  from "../sections/blog_components/BlogPostItemOne";



const DotStyle = styled('span')(({ theme }) => ({
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    margin: theme.spacing(0, 1),
  }));

const Trending = () => {
    const user = useUser();

    // console.log("Marker 17");
    // console.log(countries);

    const { themeStretch } = useSettingsContext();
    const formatter = buildFormatter(deStrings);

    const [articles, setArticle ] = useRecoilState(articlesState);
    useEffect(() => {

        const getData = async () => {
            const data = await fetchArticles();
            setArticle(data)
        };
        getData();
    }, [])

    // console.log(articles);

    const duration = "8 minutes read"; 
    const onSiderbar = true;

    return (
        <div >
            <h3 >
                {/* <span>
                    <BiTrendingUp className="h-5 w-5" />
                </span> */}
                <span >Trend Blogs</span>
            </h3>
            <div >
            {articles?.map((article) => (
                <BlogPostItemOne key={article.id} post={article} onSiderbar path="/" />
            ))}



                {/* {articles?.map((article, index)=>(
                    <div
                        key = {article.id}
                    >
                        <h3 >
                            0{index + 1}
                        </h3>
                        <div >
                            <p>{ article?.user_email }</p>
                            <p >{ article.title }</p>
                            <p >
                                {dayjs(article.inserted_at).format("DD.MM.YYYY - HH:mm")} · {" "}
                                <TimeAgo 
                                    formatter = {formatter} 
                                    lang = "de"
                                    date = { new Date(article.inserted_at) }
                                    live = { true }
                                />
                            </p>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default Trending;
