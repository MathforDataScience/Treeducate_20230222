import { useState, useCallback, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';

// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
// import { useAuthContext } from '../../../_____auth/useAuthContext';
// _mock_
// import {
//   _userAbout,
//   _userFeeds,
//   _userFriends,
//   _userGallery,
//   _userFollowers,
// } from './mock/_mock';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../../sections/@dashboard/user/profile';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { sub } from 'date-fns';
import { randomNumberRange, randomInArray } from '../../../utils/randomizers';

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------


const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index],
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index],
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index],
  },
  image: {
    cover: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    product: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/products/product_${index + 1}.jpg`,
    avatar: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
};

// ----------------------------------------------------------------------


const fullAddress = [
  '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
  '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
  '18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337',
  '110 Lamar Station Apt. 730 - Hagerstown, OK / 49808',
  '36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836',
  '2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827',
  '279 Karolann Ports Apt. 774 - Prescott Valley, WV / 53905',
  '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  '9388 Auer Station Suite 573 - Honolulu, AK / 98024',
  '47665 Adaline Squares Suite 510 - Blacksburg, NE / 53515',
  '989 Vernice Flats Apt. 183 - Billings, NV / 04147',
  '91020 Wehner Locks Apt. 673 - Albany, WY / 68763',
  '585 Candelario Pass Suite 090 - Columbus, LA / 25376',
  '80988 Renner Crest Apt. 000 - Fargo, VA / 24266',
  '28307 Shayne Pike Suite 523 - North Las Vegas, AZ / 28550',
  '205 Farrell Highway Suite 333 - Rock Hill, OK / 63421',
  '253 Kara Motorway Suite 821 - Manchester, SD / 09331',
  '13663 Kiara Oval Suite 606 - Missoula, AR / 44478',
  '8110 Claire Port Apt. 703 - Anchorage, TN / 01753',
  '4642 Demetris Lane Suite 407 - Edmond, AZ / 60888',
  '74794 Asha Flat Suite 890 - Lancaster, OR / 13466',
  '8135 Keeling Pines Apt. 326 - Alexandria, MA / 89442',
  '441 Gibson Shores Suite 247 - Pasco, NM / 60678',
  '4373 Emelia Valley Suite 596 - Columbia, NM / 42586',
  '1946 Strosin Creek Apt. 279 - Casper, CO / 21335',
  '147 Rempel Center Apt. 305 - Centennial, TN / 09375',
  '78481 Floyd Mountains Apt. 184 - Glendale, SD / 18777',
  '129 Toy Pines Suite 339 - Idaho Falls, CT / 82070',
  '08945 Cremin Underpass Apt. 700 - Iowa City, GA / 33243',
  '20728 Dorcas Highway Suite 959 - Largo, ND / 99931',
  '492 Wilburn Park Apt. 746 - Bellevue, TN / 16077',
  '70530 Garfield Tunnel Suite 902 - Detroit, IA / 01664',
  '868 Kautzer Grove Suite 334 - Kearny, KS / 51368',
  '71189 Towne Forks Suite 519 - Anchorage, IL / 52636',
  '5070 Magdalena Neck Suite 096 - Cedar Rapids, PA / 01342',
  '6216 Jermain Walk Apt. 279 - Wilmington, MA / 55416',
  '1795 Kilback Stravenue Apt. 745 - Concord, MA / 96099',
  '831 Rolfson Expressway Apt. 878 - Norman, NY / 10239',
  '909 Nathaniel Lake Suite 769 - Sherman, NJ / 46523',
  '3690 Hans Ports Apt. 369 - Cary, KS / 48930',
];

 const country = [
  'Kenya',
  'Madagascar',
  'Netherlands Antilles',
  'Azerbaijan',
  'Aruba',
  'Comoros',
  'Sierra Leone',
  'Bermuda',
  'Italy',
  'Iran',
  'Denmark',
  'Congo',
  'Cambodia',
  'Virgin Islands, British',
  'Bahamas',
  'Italy',
  'France',
  'Portugal',
  'Nepal',
  'Saint Vincent and the Grenadines',
  'Greenland',
  'Maldives',
  'Comoros',
  'Bhutan',
  'Tuvalu',
  'Ethiopia',
  'Myanmar',
  'Libyan Arab Jamahiriya',
  'Senegal',
  'Malta',
  'Kyrgyz Republic',
  'Turks and Caicos Islands',
  'Gibraltar',
  'Sweden',
  'Zambia',
  'Isle of Man',
  'Canada',
  'Turkey',
  'Samoa',
  'Vietnam',
];

// ----------------------------------------------------------------------

 const boolean = [
  true,
  true,
  true,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
];

// ----------------------------------------------------------------------

 const company = [
  'Lueilwitz and Sons',
  'Gleichner, Mueller and Tromp',
  'Nikolaus - Leuschke',
  'Hegmann, Kreiger and Bayer',
  'Grimes Inc',
  'Durgan - Murazik',
  'Altenwerth, Medhurst and Roberts',
  'Raynor Group',
  'Mraz, Donnelly and Collins',
  'Padberg - Bailey',
  'Heidenreich, Stokes and Parker',
  'Pagac and Sons',
  'Rempel, Hand and Herzog',
  'Dare - Treutel',
  'Kihn, Marquardt and Crist',
  'Nolan - Kunde',
  'Wuckert Inc',
  'Dibbert Inc',
  'Goyette and Sons',
  'Feest Group',
  'Bosco and Sons',
  'Bartell - Kovacek',
  'Schimmel - Raynor',
  'Tremblay LLC',
  'Hills - Mitchell',
  'Rogahn LLC',
  'Kuhn, Osinski and Morar',
  'Schmitt Inc',
  'Breitenberg - Rosenbaum',
  "O'Keefe, Schneider and Mraz",
  'Rohan, Langworth and Kling',
  'Morar and Sons',
  'Mraz LLC',
  'Rowe, Parisian and Kub',
  'Marquardt - Hane',
  'Medhurst Group',
  'Nikolaus - Lang',
  'Effertz, Mohr and Olson',
  'Anderson - Kris',
  'Runolfsson Group',
];


// ----------------------------------------------------------------------

 const email = [
  'nannie_abernathy70@yahoo.com',
  'ashlynn_ohara62@gmail.com',
  'milo.farrell@hotmail.com',
  'violet.ratke86@yahoo.com',
  'letha_lubowitz24@yahoo.com',
  'aditya_greenfelder31@gmail.com',
  'lenna_bergnaum27@hotmail.com',
  'luella.ryan33@gmail.com',
  'joana.simonis84@gmail.com',
  'marjolaine_white94@gmail.com',
  'vergie_block82@hotmail.com',
  'vito.hudson@hotmail.com',
  'tyrel_greenholt@gmail.com',
  'dwight.block85@yahoo.com',
  'mireya13@hotmail.com',
  'dasia_jenkins@hotmail.com',
  'benny89@yahoo.com',
  'dawn.goyette@gmail.com',
  'zella_hickle4@yahoo.com',
  'avery43@hotmail.com',
  'olen_legros@gmail.com',
  'jimmie.gerhold73@hotmail.com',
  'genevieve.powlowski@hotmail.com',
  'louie.kuphal39@gmail.com',
  'enoch.cruickshank@gmail.com',
  'arlo_mccullough@gmail.com',
  'sadie18@yahoo.com',
  'aric67@gmail.com',
  'mack_deckow53@gmail.com',
  'constantin91@yahoo.com',
  'lonny84@hotmail.com',
  'gus56@hotmail.com',
  'brennon64@yahoo.com',
  'hortense.streich@hotmail.com',
  'kallie_powlowski57@hotmail.com',
  'meghan.kemmer@hotmail.com',
  'bella.mraz14@yahoo.com',
  'barney88@gmail.com',
  'diamond_johns@hotmail.com',
  'gus80@hotmail.com',
];


// ----------------------------------------------------------------------

 const fullName = [
  'Jayvion Simon',
  'Lucian Obrien',
  'Deja Brady',
  'Harrison Stein',
  'Reece Chung',
  'Lainey Davidson',
  'Cristopher Cardenas',
  'Melanie Noble',
  'Chase Day',
  'Shawn Manning',
  'Soren Durham',
  'Cortez Herring',
  'Brycen Jimenez',
  'Giana Brandt',
  'Aspen Schmitt',
  'Colten Aguilar',
  'Angelique Morse',
  'Selina Boyer',
  'Lawson Bass',
  'Ariana Lang',
  'Amiah Pruitt',
  'Harold Mcgrath',
  'Esperanza Mcintyre',
  'Mireya Conner',
  'Jamie Kline',
  'Laney Vazquez',
  'Tiffany May',
  'Dexter Shepherd',
  'Jaqueline Spencer',
  'Londyn Jarvis',
  'Yesenia Butler',
  'Jayvon Hull',
  'Izayah Pope',
  'Ayana Hunter',
  'Isabell Bender',
  'Desiree Schmidt',
  'Aidan Stout',
  'Jace Bush',
  'Janiya Williamson',
  'Hudson Alvarez',
];

 const firstName = [
  'Mossie',
  'David',
  'Ebba',
  'Chester',
  'Eula',
  'Jaren',
  'Boyd',
  'Brady',
  'Aida',
  'Anastasia',
  'Gregoria',
  'Julianne',
  'Ila',
  'Elyssa',
  'Lucio',
  'Lewis',
  'Jacinthe',
  'Molly',
  'Brown',
  'Fritz',
  'Keon',
  'Ella',
  'Ken',
  'Whitney',
  'Monte',
  'Rose',
  'Shana',
  'Devon',
  'Jaleel',
  'Laury',
  'Brooks',
  'Bruce',
  'Avery',
  'Esperanza',
  'Helene',
  'Heloise',
  'Elinor',
  'Adeline',
  'Haley',
  'Anabelle',
];

 const lastName = [
  'Carroll',
  'Simonis',
  'Yost',
  'Hand',
  'Emmerich',
  'Wilderman',
  'Howell',
  'Sporer',
  'Boehm',
  'Morar',
  'Koch',
  'Reynolds',
  'Padberg',
  'Watsica',
  'Upton',
  'Yundt',
  'Pfeffer',
  'Parker',
  'Zulauf',
  'Treutel',
  'McDermott',
  'McDermott',
  'Cruickshank',
  'Parisian',
  'Auer',
  'Turner',
  'Dooley',
  'Wiegand',
  'Abbott',
  'Wisoky',
  'Fahey',
  'Satterfield',
  'Bahringer',
  'Schulist',
  'Durgan',
  'Carroll',
  'Jones',
  'Leffler',
  'Gutkowski',
  'Homenick',
];


// ----------------------------------------------------------------------

 const price = [
  16.19, 35.71, 34.3, 93.1, 55.47, 89.09, 44.39, 26.92, 45.35, 26.96, 78.22, 35.54, 90.69, 63.61,
  67.55, 94.75, 75.78, 39.6, 52.84, 72.8, 83.08, 85.02, 69.22, 60.96, 84.7, 16.68, 78.83, 58.07,
  65.8, 55.69, 87.55, 44.74, 27.42, 84, 76.17, 43.83, 76.39, 17.42, 42.3, 12.45,
];

 const rating = [
  2.5, 2, 4.9, 2, 4, 5, 4.9, 5, 3.7, 2.5, 2, 4.9, 4.8, 4, 2, 3.7, 1.4, 2.4, 1.8, 5, 2.9, 3.9, 3.9,
  1.8, 5, 2.6, 3.1, 3.9, 1.2, 3.2, 4.1, 5, 4.5, 4.1, 2.3, 2.4, 5, 3.1, 4.9, 1.7,
];

 const age = [
  52, 43, 56, 25, 22, 53, 38, 50, 55, 37, 16, 27, 55, 41, 52, 32, 34, 52, 31, 53, 23, 48, 43, 41,
  19, 21, 17, 29, 32, 54, 38, 34, 49, 33, 55, 50, 24, 27, 23, 23,
];

 const percent = [
  8.62, 86.36, 73.99, 79, 63.41, 58.79, 12.32, 88.44, 45.06, 91.64, 88.41, 73.08, 39.14, 89.34,
  43.37, 34.45, 24.04, 80.96, 72.91, 47.59, 2.46, 3.33, 99.31, 47.6, 34.09, 50.61, 66.13, 46.69,
  92.43, 31.41, 90.85, 36.32, 38.84, 25.6, 87.61, 1.31, 89.32, 41.23, 85.9, 62.63,
];


// ----------------------------------------------------------------------

 const phoneNumber = [
  '365-374-4961',
  '904-966-2836',
  '399-757-9909',
  '692-767-2903',
  '990-588-5716',
  '955-439-2578',
  '226-924-4058',
  '552-917-1454',
  '285-840-9338',
  '306-269-2446',
  '883-373-6253',
  '476-509-8866',
  '201-465-1954',
  '538-295-9408',
  '531-492-6028',
  '981-699-7588',
  '500-268-4826',
  '205-952-3828',
  '222-255-5190',
  '408-439-8033',
  '272-940-8266',
  '812-685-8057',
  '353-801-5212',
  '606-285-8928',
  '202-767-8621',
  '222-830-0731',
  '964-940-3166',
  '262-702-2396',
  '886-261-9789',
  '352-390-5069',
  '343-907-8334',
  '575-347-2399',
  '749-228-5604',
  '774-452-2071',
  '607-841-0447',
  '395-619-2157',
  '233-834-0373',
  '586-880-2602',
  '746-772-0722',
  '638-615-3365,',
];


// ----------------------------------------------------------------------

 const role = [
  'ux designer',
  'full stack designer',
  'backend developer',
  'ux designer',
  'ux designer',
  'project manager',
  'leader',
  'backend developer',
  'project manager',
  'ui designer',
  'ui/ux designer',
  'ui/ux designer',
  'ui designer',
  'backend developer',
  'backend developer',
  'front end developer',
  'backend developer',
  'full stack designer',
  'full stack developer',
  'backend developer',
  'ux designer',
  'ui designer',
  'project manager',
  'ui/ux designer',
  'ui designer',
  'project manager',
  'full stack developer',
  'hr manager',
  'hr manager',
  'ui/ux designer',
  'project manager',
  'full stack designer',
  'ui designer',
  'leader',
  'front end developer',
  'ui/ux designer',
  'project manager',
  'ui/ux designer',
  'ui designer',
  'full stack designer',
];


// ----------------------------------------------------------------------

 const title = [
  `Apply These 7 Secret Techniques To Improve Event`,
  `Believing These 7 Myths About Event Keeps You From Growing`,
  `Don't Waste Time! 7 Facts Until You Reach Your Event`,
  `How 7 Things Will Change The Way You Approach Event`,
  `Event Awards: 7 Reasons Why They Don't Work & What You Can Do About It`,
  `Event Doesn't Have To Be Hard. Read These 7 Tips`,
  `Event Is Your Worst Enemy. 7 Ways To Defeat It`,
  `Event On A Budget: 7 Tips From The Great Depression`,
  `Knowing These 7 Secrets Will Make Your Event Look Amazing`,
  `Master The Art Of Event With These 7 Tips`,
  `My Life, My Job, My Career: How 7 Simple Event Helped Me Succeed`,
  `Take Advantage Of Event - Read These 7 Tips`,
  `The Next 7 Things You Should Do For Event Success`,
  `The Time Is Running Out! Think About These 7 Ways To Change Your Event`,
  `The 7 Best Things About Event`,
  `The 7 Biggest Event Mistakes You Can Easily Avoid`,
  `The 7 Most Successful Event Companies In Region`,
  `Think Your Event Is Safe? 7 Ways You Can Lose It Today`,
  `Thinking About Event? 7 Reasons Why It's Time To Stop!`,
  `7 Places To Get Deals On Event`,
  `Best Event Android Apps`,
  `Best Event Tips You Will Read This Year`,
  `Best 30 Tips For Event`,
  `Should Fixing Event Take 30 Steps?`,
  `The A - Z Of Event`,
  `The Next 30 Things To Immediately Do About Event`,
  `The Ultimate Guide To Event`,
  `Top 30 Funny Event Quotes`,
  `Top 30 Quotes On Event`,
  `Top 7 Lessons About Event To Learn Before You Hit 30`,
  `Top 7 Ways To Buy A Used Event`,
  `30 Best Ways To Sell Event`,
  `30 Ideas For Event`,
  `30 Lessons About Event You Need To Learn Before You Hit 40`,
  `30 Methods Of Event Domination`,
  `30 Things To Do Immediately About Event`,
  `30 Tips To Grow Your Event`,
  `30 Ways To Avoid Event Burnout`,
  `30 Ways To Improve Event`,
  `How To Make More Event By Doing Less`,
];

 const sentence = [
  `Assumenda nam repudiandae rerum fugiat vel maxime.`,
  `Quis veniam aut saepe aliquid nulla.`,
  `Reprehenderit ut voluptas sapiente ratione nostrum est.`,
  `Error ut sit vel molestias velit.`,
  `Quo quia sit nihil nemo doloremque et.`,
  `Autem doloribus harum vero laborum.`,
  `Tempora officiis consequuntur architecto nostrum autem nam adipisci.`,
  `Voluptas sunt magni adipisci praesentium saepe.`,
  `Ea architecto quas voluptates voluptas earum illo est vel rem.`,
  `Ipsum expedita reiciendis ut.`,
  `Architecto vel voluptatibus alias a aut non maxime ipsa voluptates.`,
  `Reiciendis enim officiis cupiditate eaque distinctio laudantium modi similique consequatur.`,
  `Ab autem consequatur itaque mollitia ipsum cupiditate error repudiandae nobis.`,
  `Distinctio architecto debitis eligendi consequatur unde id modi accusantium possimus.`,
  `At ut voluptate accusantium.`,
  `Repudiandae ut qui veritatis sint.`,
  `Laboriosam blanditiis quo sed et qui esse ipsam necessitatibus sed.`,
  `Et molestiae et excepturi maxime omnis.`,
  `Sint dolorem quam eum magnam.`,
  `Rerum ut iusto iste quam voluptatem necessitatibus.`,
  `Et quam in.`,
  `Fugit esse tenetur.`,
  `Dolorem dolor porro nihil cupiditate molestiae deserunt ut.`,
  `Omnis beatae eos eius aut molestias laboriosam laborum et optio.`,
  `Ut veniam quam assumenda ut voluptatibus ducimus accusamus.`,
  `Quos dignissimos neque omnis reiciendis voluptatem ducimus.`,
  `Laboriosam quia ut esse.`,
  `Sit reiciendis nihil qui molestias et.`,
  `Facilis cupiditate minima ratione quaerat omnis velit non ex totam.`,
  `Provident sint esse voluptatem voluptas eveniet est.`,
  `Molestias consequatur ea facilis.`,
  `Tempora voluptatibus autem ut ut porro quae delectus dolorum.`,
  `Et consequatur amet nemo ducimus voluptatem placeat voluptas.`,
  `Modi iste atque hic voluptas sit quis deleniti quas consequatur.`,
  `Omnis est aliquid odio mollitia aliquid ex.`,
  `Officia possimus veniam quod molestias.`,
  `Mollitia inventore recusandae provident aut.`,
  `Numquam ullam beatae possimus.`,
  `Fuga velit cupiditate ex culpa odio aut ut.`,
  `Vero corrupti nam voluptatum excepturi est et.`,
];

 const description = [
  `Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.`,
  `Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.`,
  `Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.`,
  `Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.`,
  `Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.`,
  `Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.`,
  `Est enim et sit non impedit aperiam cumque animi. Aut eius impedit saepe blanditiis. Totam molestias magnam minima fugiat.`,
  `Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.`,
  `Eaque natus adipisci soluta nostrum dolorem. Nesciunt ipsum molestias ut aliquid natus ut omnis qui fugiat. Dolor et rem. Ut neque voluptatem blanditiis quasi ullam deleniti.`,
  `Nam et error exercitationem qui voluptate optio. Officia omnis qui accusantium ipsam qui. Quia sequi nulla perspiciatis optio vero omnis maxime omnis ipsum. Perspiciatis consequuntur asperiores veniam dolores.`,
  `Perspiciatis nulla ut ut ut voluptates totam consectetur eligendi qui. Optio ut cum. Dolorum sapiente qui laborum. Impedit temporibus totam delectus nihil. Voluptatem corrupti rem.`,
  `Distinctio omnis similique omnis eos. Repellat cumque rerum nisi. Reiciendis soluta non ut veniam temporibus. Accusantium et dolorem voluptas harum. Nemo eius voluptate dicta et hic nemo. Dolorem assumenda et beatae molestias sit quo mollitia quis consequatur.`,
  `Sed ut mollitia tempore ipsam et illum doloribus ut. Occaecati ratione veritatis explicabo. Omnis nam omnis sunt placeat tempore accusantium placeat distinctio velit.`,
  `Eum illo dicta et perspiciatis ut blanditiis eos sequi. Ea veritatis aut et voluptas aut. Laborum eos quia tempore a culpa.`,
  `Aut quos quae dolores repudiandae similique perferendis perferendis earum laudantium. Facere placeat natus nobis. Eius vitae ullam dolorem.`,
  `Vero dolorem et voluptatem fugit tempore a quam iure. Fuga consequatur corrupti sunt asperiores vitae. Libero totam repellendus animi debitis illum et sunt officia.`,
  `Cupiditate illum officiis id molestiae. Numquam non molestiae aliquid et natus sed hic. Alias quia explicabo sed corrupti sint. Natus in et odio qui unde facilis quia. Est sit eius laboriosam aliquid non aperiam quia quo corporis.`,
  `Et a ab. Optio aspernatur minus tempora amet vitae consectetur inventore cumque. Sed et omnis. Aspernatur a magnam.`,
  `Ipsum omnis et. Quia ea et autem tempore consequuntur veniam dolorem officiis. Ipsa dicta et ut quidem quia doloremque. Sequi vitae doloremque temporibus. Deserunt incidunt id aperiam itaque natus. Earum sit eaque quas incidunt nihil.`,
  `Quae consequatur reiciendis. Consequatur non optio. Eaque id placeat. Commodi quo officia aut repudiandae reiciendis tempore voluptatem et. Ut accusamus qui itaque maxime aliquam. Fugit ut animi molestiae porro maiores.`,
  `Modi hic asperiores ab cumque quam est aut. Voluptas atque quos molestias. Ut excepturi distinctio ipsam aspernatur sit.`,
  `Sunt totam facilis. Quam commodi voluptatem veniam. Tempora deleniti itaque fugit nihil voluptas.`,
  `Ipsam aliquam velit nobis repellendus officiis aut deserunt id et. Nihil sunt aut dolores aut. Dolores est ipsa quia et laborum quidem laborum accusamus id. Facilis odit quod hic laudantium saepe omnis nisi in sint. Sed cupiditate possimus id.`,
  `Magnam non eveniet optio optio ut aliquid atque. Velit libero aspernatur quis laborum consequatur laudantium. Tempora facere optio fugit accusantium ut. Omnis aspernatur reprehenderit autem esse ut ut enim voluptatibus.`,
  `Ipsam vel molestiae dolorem iure molestiae. Ut qui cumque et sint recusandae modi nulla. Vel rerum tempore similique autem enim voluptatem dolores facilis. Qui delectus recusandae magnam.`,
  `Fugiat molestias distinctio enim nobis rerum. Perspiciatis adipisci corrupti quas sed ab sunt nostrum. Quibusdam reiciendis ratione dolores vitae fuga exercitationem asperiores maxime voluptate. Minus et ea delectus quia ullam est. Exercitationem iusto libero. Et aut dolore reprehenderit et saepe sint modi.`,
  `Ex neque aut voluptatem delectus eum deserunt voluptate. Ut quam placeat et. Et impedit tenetur illum aut consequatur quia. Autem sed dolorem non ad aspernatur illum dignissimos beatae. Earum iusto aut rem aut. Facere ea alias enim quo assumenda.`,
  `Quis sint recusandae quasi corporis et fugit. Omnis voluptatum id laborum qui. Assumenda animi quia eum et facere fuga. Ab et sint molestiae et voluptatum nostrum est.`,
  `Est quis numquam recusandae alias porro magni. Incidunt quis aut necessitatibus nam ea dolores cumque. Quis dolorum veniam.`,
  `Corporis magnam non. Ut voluptates pariatur et. Quis tenetur mollitia et necessitatibus et. Perferendis error velit aut.`,
  `Eos ex accusantium possimus aut quae. Omnis dolorum velit. Sapiente quia dolore ea assumenda voluptatem exercitationem sed consequuntur. Eveniet et molestiae ipsa harum quidem soluta quo. Consequatur ad sunt sed numquam odio eveniet.`,
  `Ut sit et provident vero vero voluptatem distinctio. Cumque sit error qui et. Ea architecto ipsum occaecati sed alias eum vel. Officia tempore architecto autem vel veniam. Minus modi commodi ad consequatur similique ut. Tenetur tempore eum.`,
  `Quibusdam in cum voluptatem consequatur rerum. Qui eum assumenda nemo maiores veniam quae. Ipsa occaecati et provident. Quas similique deserunt doloremque placeat natus.`,
  `Voluptates et earum fugiat molestiae distinctio. Aut sapiente quas dolores et. Quo et dolor velit et iure consequatur ut in amet. Repellendus aut sequi animi inventore nesciunt itaque.`,
  `Sit a tempore dicta provident molestiae. Necessitatibus blanditiis voluptatum. Magnam esse animi in qui veritatis quibusdam recusandae adipisci possimus. Tenetur dolores ipsum.`,
  `Neque id sunt amet modi expedita aut libero aut in. Minima dolore praesentium quia quas et pariatur numquam. In ut sequi nemo velit iste minima aliquam. Neque ut tenetur consequuntur sint nemo unde. Magni nesciunt omnis illo optio. Molestias eum exercitationem aut harum odit.`,
  `Modi quia laboriosam qui ad aut. Fugit quisquam earum distinctio officia est fugit quos. Iure repellat distinctio veritatis voluptate amet ratione repudiandae.`,
  `Impedit perferendis vel quis ratione. Id aut id officia. Illum fuga saepe provident voluptate eligendi provident. Et nostrum maxime magni. Nobis cumque id magni in iste earum.`,
  `Dolor numquam maiores praesentium dolorem nihil minus praesentium rem dolorem. Est rerum placeat. Numquam sed magni aliquam laborum enim facere ducimus.`,
  `In sint enim nam et itaque et qui. Molestiae a iusto quidem quia temporibus id quia eaque eius. Quis quia consectetur saepe vero et molestias. Rem minima accusamus vitae adipisci molestiae unde voluptate consequatur molestiae. Rerum exercitationem quisquam vitae.`,
];


 const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];



const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  role: 'UI Designer',
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: _mock.address.country(1),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  socialLinks: {
    facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
    instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
    linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatarUrl: _mock.image.avatar(1),
    name: 'Caitlyn Kerluke',
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.cover(index),
  message: _mock.text.sentence(index),
  personLikes: [...Array(36)].map((__, personIndex) => ({
    name: _mock.name.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPosts: randomNumberRange(999, 99999),
  role: _mock.role(index),
}));

const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phoneNumber(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zipCode: '85807',
}));

const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));






// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------



export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const router = useRouter();
  const supaBaseClient = useSupabaseClient();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
     router.replace("/");
    } else {
     setIsLoading(false)
    }
  }, []);

// --------------------------------------------------


  // const { user } = useAuthContext();
  // const  user = { displayName : "carl_von@clausewitz.preussen872" };

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');


  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'followers',
      label: 'Followers',
      icon: <Iconify icon="eva:heart-fill" />,
      // component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'friends',
      label: 'Friends',
      icon: <Iconify icon="eva:people-fill" />,
      // component: (
      //   <ProfileFriends
      //     friends={_userFriends}
      //     searchFriends={searchFriends}
      //     onSearchFriends={(event) => setSearchFriends(event.target.value)}
      //   />
      // ),
    },
    {
      value: 'gallery',
      label: 'Gallery',
      icon: <Iconify icon="ic:round-perm-media" />,
      // component: <ProfileGallery gallery={_userGallery} />,
    },
  ];


  return (
    <>
      <Head>
        <title> User: Profile </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.email },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover name={user?.displayName} role={_userAbout.role} cover={_userAbout.cover} />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
