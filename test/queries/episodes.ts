export const getAllEpisodes = () => {
  return `{
  episodes {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      episode
    }
  }
}`;
}

export const filterEpisodeByNumber = (episode: string) => {
  return `{
    episodes (filter:{episode:"${episode}"}) {
      results {
        id
        name
        episode
      }
    }
  }`
}

export const filterEpisodeByName = (episodeName: string) => {
  return `{
    episodes (filter: {name: "${episodeName}"}) {
      results {
        id
        name
        episode
      }
    }
  }
  `
}