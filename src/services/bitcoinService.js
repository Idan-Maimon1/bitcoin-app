import axios from 'axios'
import { storageService } from './storageService.js'

const KEY = 'bitcoin_db'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
}

async function getRate(coins) {
    const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    return data
}

async function getMarketPrice(type) {
    const bitcoinData = storageService.load(KEY) || {}
    if (bitcoinData.marketPrices) return bitcoinData.marketPrices
    return await _prepData('market-price')
}

async function getConfirmedTransactions() {
    const bitcoinData = storageService.load(KEY) || {}
    if (bitcoinData.confirmedTransactions) return bitcoinData.confirmedTransactions
    return await _prepData('n-transactions')
}

async function _prepData(type) {
    const res = await axios.get(`https://api.blockchain.info/charts/${type}?timespan=5months&format=json&cors=true`)
    const { name, description, values } = res.data
    const bitcoinValues = values.map(value => value.y)
    const resDetails = {
        name,
        description,
        values: bitcoinValues,
    }
    const bitcoinData = storageService.load(KEY) || {}
    bitcoinData[type] = resDetails
    storageService.store(KEY, bitcoinData)
    return resDetails
}