export type artistType = {
  id: number;
  attributes: {
    name: string;
    slug: string;
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
    viewCount: number;
    extApiId: string;
  };
};
export type albumType = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    artistId: number;
    artistName: string;
    extApiId: string;
    imageUrl: string;
    songs: {
      data: songType[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type songType = {
  id: number;
  attributes: {
    title: string;
    originalSong: string | null;
    translatedSong: string | null;
    writtenBy: string | null;
    producedBy: string | null;
    releaseDate: string;
    songDescription: string | null;
    slug: string;
    imageUrl: string;
    albumName: string;
    albumId: number;
    artistName: string;
    artistId: number;
    artistSlug: string;
    extApiId: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
  imageUrl?: string;
};
