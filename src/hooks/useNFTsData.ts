import * as metadata from '../powerCardsNFTs/metadata'
import * as images from '../powerCardsNFTs/images'

export type NFTsDataType = {
  [id: number | string]: {
    img: string
    title: string
    stats: string
    statsMax: string
    powers: string
  }
}

export function useNFTsData(ids: number[]): string {
  let NFTsData: NFTsDataType = {}

  ids.forEach((id: number) => {
    const jsonData = metadata[`f${id}` as keyof typeof metadata]
    const image = images[`Img${id}` as keyof typeof images]

    if (jsonData && image) {
      NFTsData[id] = {
        img: image,
        title: jsonData.title,
        stats: jsonData.Stats,
        statsMax: jsonData.StatsMax,
        powers: jsonData.Powers,
      }
    }
  })

  return JSON.stringify(NFTsData)
}

export function useAllNFTsData(): string {
  let idsList: number[] = []

  Object.keys(metadata).forEach((key: string) => {
    idsList.push(Number(key.substring(1, key.length)))
  })

  return useNFTsData(idsList)
}
