import http from '../utils/http'


export const baseImgPath = ''
export const baseUrl = 'http://localhost:8010'
export const login = data => http.post('/user/login', data);

export const logout = () => http.post('/user/logout');

export const addGoods = data => http.post('/api/createWine',data);

export const getGoodList = () => http.get('/api/getWines');

export const getShopList = data => http.get("/api/getShops", data);

export const getOrderList = data => http.get("/api/getOrders", data);


export const addShop = data => http.post('/api/createShop', data);

export const updateOrder = data => http.post('/api/updateOrder', data);

export const updateShop = data => http.post('/api/updateShop', data);

export const mapKey = 'f07e24eacb9f7469412cc14de883d683'

export const MapCityName = '郑州'


