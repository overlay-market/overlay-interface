import * as metadata from '../powerCardsNFTs/metadata'
import * as images from '../powerCardsNFTs/images'

export type NFTsDataType = {
  [id: number]: {
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

    NFTsData[id] = {
      img: images[`Img${id}` as keyof typeof images],
      title: jsonData.title,
      stats: jsonData.Stats,
      statsMax: jsonData.StatsMax,
      powers: jsonData.Powers,
    }
  })

  return JSON.stringify(NFTsData)
}
