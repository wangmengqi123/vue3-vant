// const Mock = import('mockjs')
import Mock from 'mockjs'
// console.log(Mock, "MockMockMock");
const Random = Mock.Random
const produceNewsData = () => {
    // let newsList = []
    let data = {
        list: [],
        total: 20
    }
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            title: Random.ctitle(), // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
            content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
        }
        data.list.push(newNewsObject)
    }
    return data
}

// 请求该url，就可以返回newsList
Mock.mock('/mock/news', produceNewsData)
Mock.mock('/api/products', 'get', {
    'products|5-10': [{
        'url': '@url',
        'title': '@ctitle(5,10)',
        'content': '@cparagraph',
        'price|10-1000': 1
    }]
});