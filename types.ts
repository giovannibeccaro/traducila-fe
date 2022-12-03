export type artistType = {
  id: number;
  attributes: {
    artistName: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    artistSlug: string;
    songs: {
      data: songType[];
    };
  };
};

export type songType = {
  id: number;
  attributes: {
    songName: string;
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
      data: {
        id: number;
        attributes: {
          albumName: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          albumSlug: string;
        };
      };
    };
    artist: { data: artistType };
  };
};

export type fetchedDataType = {
  data: songType[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
export type fetchedArtistDataType = {
  data: artistType[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
