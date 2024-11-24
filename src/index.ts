const news = document.querySelector('#news')

const api: string = 'https://newsapi.org/v2/'
const key: string = 'a98ef34c88664b228ccf4f9da1f5b3b9'

// type NewsApiResponse = {
// 	status: 'ok' | 'error'
// 	totalResults: number
// 	articles: Array<Article>
// }


type Article = {
	source: { id: null | string; name: string },
	author: string | null,
	title: string,
	description: string | null,
	url: string,
	urlToImage: string | null,
	publishedAt: string,
	content: string
}

async function fetchNews() {
    let topicInput: string = (<HTMLInputElement>document.getElementById('input')).value;
    if (topicInput !== ""){
        const response: Response = await fetch(`${api}everything?q=${topicInput}&pagesize=50&apiKey=${key}`)
   
	    const obj  = await response.json()
	    console.log(obj.articles)
	    renderNews(obj.articles)
    } else {
        const response: Response = await fetch(`${api}everything?q=Apple&pagesize=50&apiKey=${key}`)
    
	    const obj = await response.json()
	    console.log(obj.articles)
	    renderNews(obj.articles)
    }    
    topicInput = (<HTMLInputElement>document.getElementById('input')).value = ""
	
}
document.getElementById('button')?.addEventListener('click', function(){fetchNews()})


function renderNews(newsArr: Article[]) {
    
    if (news){
    news.innerHTML = " ";
    }
    const filterNews: Article[] = [];
    newsArr.forEach(newItem => {

        if (newItem.source && newItem.source.name && newItem.title && newItem.url && newItem.urlToImage && newItem.publishedAt && newItem.content) {
            filterNews.push(newItem);
        }
    });

        const limitNews = filterNews.slice(0, 10);

        limitNews.forEach(newItem => {
        const topic: HTMLDivElement = document.createElement('div')
        topic.className = 'topic'
        news?.appendChild(topic)


        const listItem: HTMLDivElement = document.createElement('div')
		listItem.className = 'news__item';
		topic.appendChild(listItem)


        if (newItem.urlToImage){
		const imgItem: HTMLDivElement = document.createElement('div')
        imgItem.className = "topicImages"
        const imgUrl: string = newItem.urlToImage
		imgItem.style.backgroundImage = `url("${imgUrl}")`
        listItem.appendChild(imgItem)
        }

        const postTimeList: HTMLDivElement = document.createElement('div')
        postTimeList.className = "topicData"
        postTimeList.textContent = newItem.publishedAt
					.slice(0, 10)
					.split('-')
					.reverse()
					.join('-')
        listItem.appendChild(postTimeList)
        
        
        
        const listIfo: HTMLDivElement = document.createElement('div')
        listIfo.className = 'topicItemIfo'
        topic.appendChild(listIfo)

        const titleList: HTMLHeadElement = document.createElement('h2')
        titleList.className = 'topicTitle'
        titleList.textContent = newItem.title
        listIfo.appendChild(titleList)
        // news?.appendChild(titleList)

        const authorItem: HTMLHeadElement = document.createElement('h3')
        authorItem.className = "topicAuthor"
        authorItem.textContent = newItem.author || 'Unknown Author'
        listIfo.appendChild(authorItem)

        const contentList: HTMLParagraphElement = document.createElement('p')
        contentList.className = 'topicContent'
        const words: string[] = newItem.content.split(' ')
        const first20Words: string = words.slice(0,20).join(' ')
        contentList.textContent = first20Words
        
        
        // contentList.textContent = newItem.content
        listIfo.appendChild(contentList)

        const linkUrl: HTMLParagraphElement = document.createElement('p')
        linkUrl.className = "urlContent"
        listIfo.appendChild(linkUrl)
        
        const urlList: HTMLAnchorElement = document.createElement('a')
        urlList.className = "topicUrl"
        urlList.href = newItem.url
        urlList.textContent = "Read more";
        linkUrl.appendChild(urlList)

	})
}






// type NewsApiResponse = {
// 	status: 'ok' | 'error'
// 	totalResults: number
// 	articles: [
//         source: { id: null | string; name: string },
// 	    author: string,
// 	    title: string,
// 	    description: string | null,
// 	    url: string,
// 	    urlToImage: null | string,
// 	    publishedAt: Date,
// 	    content: string,
//     ]
// }
