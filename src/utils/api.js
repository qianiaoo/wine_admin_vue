import http from '../utils/http'


export const baseImgPath = ''
export const baseUrl = 'http://localhost:8010'
export const login = data => http.post('/user/login', data);

export const logout = () => http.post('/user/logout');

export const addGoods = data => http.post('/api/createWine',data);

export const mapKey = 'f07e24eacb9f7469412cc14de883d683'

export const MapCityName = '郑州'


