import http from '../utils/http'


export const baseImgPath = ''
export const baseUrl = 'http://localhost:8010'

export const login = data => http.post('/user/login', data);

export const logout = () => http.post('/user/logout');

export const addGoods = data => http.post('/api/createWine',data);

export const getGoodList = data => http.get('/api/getAllWines',data);

export const deletePic = data => http.get('/api/deletePic',data);

export const getShopList = data => http.get("/api/getShops", data);

export const getOrderList = data => http.get("/api/getAllOrders", data);

export const updateStock = data => http.get("/api/changeStocks", data);

export const changeHp = data => http.get("/api/changeHP", data);

export const getBill = () => http.get("/api/getBill")

export const achieveBill = data => http.get("/api/achieveBill", data);

export const addShop = data => http.post('/api/createShop', data);

export const shopPic = data => http.get('/api/showPic', data);

export const updateOrder = data => http.get('/api/updateStatus', data);

export const updateShop = data => http.post('/api/updateShop', data);

export const refuseOrder = data => http.get('/api/refuseOrder', data);

export const mapKey = 'f07e24eacb9f7469412cc14de883d683'

export const MapCityName = '郑州'


