import React from "react";
import ChiSiamoMusic from "../../components/svgs/ChiSiamoMusic";
import ChiSiamoWorld from "../../components/svgs/ChiSiamoWorld";
import ChiSiamoSearch from "../../components/svgs/ChiSiamoSearch";
import Head from "next/head";

const ChiSiamoPage = () => {
  return (
    <>
      <Head>
        <title>Chi siamo - Traducila</title>
        <meta
          name="description"
          content="Scopri cosa c'è dietro a traducila.it e i metodi che usiamo nel traduzione.s"
        />
      </Head>
      <main className="chi-siamo-page">
        <article className="main-article">
          <h2>Chi siamo</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto iure
            laborum atque quia soluta provident enim id officiis odit similique
            cumque omnis fuga voluptatibus dolorum, delectus ratione doloremque
            esse reiciendis velit quidem maiores expedita eaque error. Sequi
            magni, repellendus aliquam tenetur provident architecto voluptates
            laboriosam non voluptatum accusantium? Quidem quis praesentium,
            officia quod reiciendis reprehenderit error, aperiam quae sed vitae
            rerum veniam ipsam ullam ab architecto, alias id eligendi tempore
            placeat minima. Est beatae illo sapiente cumque obcaecati doloremque
            eligendi deleniti id rem modi deserunt esse fuga corporis blanditiis
            quos dolore ratione magnam, quo minima eos! Magni blanditiis
            obcaecati sed.
          </p>
        </article>
        <section className="secondary-articles">
          <article className="secondary-article">
            <h2>Lettura approfondita del testo originale</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus sint laborum veniam velit quia deserunt numquam,
              placeat quibusdam incidunt eaque iure voluptatibus nobis ipsa
              dignissimos repellendus facilis eos suscipit modi eius error vero
              alias! Aperiam numquam praesentium in adipisci sequi repudiandae,
              laboriosam iste modi esse! Maxime, quisquam assumenda. Error,
              quisquam!
            </p>
            <ChiSiamoSearch />
          </article>
          <article className="secondary-article">
            <h2>Lorem ipsum, dolor sit amet consectetur</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus sint laborum veniam velit quia deserunt numquam,
              placeat quibusdam incidunt eaque iure voluptatibus nobis ipsa
              dignissimos repellendus facilis eos suscipit modi eius error vero
              alias! Aperiam numquam praesentium in adipisci sequi repudiandae,
              laboriosam iste modi esse! Maxime, quisquam assumenda. Error,
              quisquam!
            </p>
            <ChiSiamoWorld />
          </article>
          <article className="secondary-article">
            <h2>Lorem ipsum, dolor sit amet consectetur</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus sint laborum veniam velit quia deserunt numquam,
              placeat quibusdam incidunt eaque iure voluptatibus nobis ipsa
              dignissimos repellendus facilis eos suscipit modi eius error vero
              alias! Aperiam numquam praesentium in adipisci sequi repudiandae,
              laboriosam iste modi esse! Maxime, quisquam assumenda. Error,
              quisquam!
            </p>
            <ChiSiamoMusic />
          </article>
        </section>
      </main>
    </>
  );
};

export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404 in production
    notFound: true,
  };
}

export default ChiSiamoPage;
