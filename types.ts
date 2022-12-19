export type artistType = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    tags: { data: tagType[] };
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    songs: {
      data: songType[];
    };
    albums: {
      data: albumType[];
    };
  };
};
export type albumType = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    image: imagesType;
    songs: {
      data: songType[];
    };
  };
};

export type songType = {
  id: number;
  attributes: {
    name: string;
    originalSong: string;
    translatedSong: string;
    writtenBy: string;
    producedBy: string;
    yearOfProduction: string;
    songDescription: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    songImg: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    album: {
      data: albumType;
    };
    artist: { data: artistType };
  };
};

export type fetchedDataType = {
  data: songType[];
};

export type fetchedArtistDataType = {
  data: artistType[];
};

export type suggestionType = {
  entryName: string;
  category: string;
  artist?: string;
  slug: string;
  test?: string;
  artistSlug?: string;
  image?: string;
};

export type tagType = {
  id: number;
  attributes: {
    genre: string;
  };
};

type imageType = {
  id: number;
  attributes: {
    mime: string;
    url: string;
    width: 640;
  };
};

export type imagesType = {
  data: imageType[];
};
