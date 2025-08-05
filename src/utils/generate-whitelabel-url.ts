import type { Hotel } from "../types";

export const generateWhitelabelUrl = (hotel: Hotel, options: { language: 'IT' | 'EN', currency: 'EUR' | 'USD' } = { language: 'EN', currency: 'EUR' }): string => {
  const params = {
    checkin: new Date().toISOString().split('T')[0], // Today
    checkout: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
    rooms: 1,
    adults: 2,
  }

  return `https://whitelabel.nuitee.link/hotels/${hotel.id}?placeId=${hotel.placeId}=&checkin=${params.checkin}&checkout=${params.checkout}&rooms=${params.rooms}&adults=${params.adults}&name=${hotel.locality}&language=${options.language.toLowerCase()}&currency=${options.currency}&children=`
}