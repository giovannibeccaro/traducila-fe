import { artistType, songType } from "../types";
import { getQuery } from "../utils/utils";

const EXTERNAL_DATA_URL = "https://jsonplaceholder.typicode.com/posts";

function generateSiteMap(songs: songType[], artists: artistType[]) {
  console.log("songs: ", songs, "artists: ", artists);
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${songs
       .map((song) => {
         return `
       <url>
           <loc>${`http://traducila.it/${song.attributes.artistSlug}/${song.attributes.slug}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${artists
       .map((artist) => {
         return `
       <url>
           <loc>${`http://traducila.it/${artist.attributes.slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  //TODO filter data for translated song not null so that we have less less stress on api
  //TODO what happens on 101st song? Possible pagination problem, check back later
  const postsEntpoint = getQuery("posts");
  if (!postsEntpoint) return;
  const songResponse = await fetch(
    postsEntpoint + "?filters[translatedSong][$notNull]=true"
  );
  const songsData: { data: songType[] } = await songResponse.json();

  const artistsEndpoint = getQuery("artists");
  const artistsResponse = await fetch(artistsEndpoint);
  const artistsData: { data: artistType[] } = await artistsResponse.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(songsData.data, artistsData.data);
  console.log(res);
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
