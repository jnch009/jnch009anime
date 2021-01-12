export const helperVariables = {
  title: `Anime for all your needs!`,
  fetchAnime: `https://api.jikan.moe/v3/top/anime`,
  fetchManga: `https://api.jikan.moe/v3/top/manga`,
  subTypeAnime: 'anime',
  subTypeManga: 'manga',
  subTypeSearch: 'search',
  topItemsToReturn: 4,
};

export const helperFunctions = {
  offset: type => type * helperVariables.topItemsToReturn - helperVariables.topItemsToReturn,
};
