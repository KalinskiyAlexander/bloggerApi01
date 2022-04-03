import express, { Request, Response } from 'express'
export const router = express.Router()

//TYPES
export interface IPost {
  id: number
  title: string
  bloggerId: number
  bloggerName: string
  shortDescription: string
  content: string
}

export interface IBlogger {
  id: number
  name: string
  youtubeUrl: string
}

//MOCK DATA
let bloggers:IBlogger[] = [
  {
    id: 1,
    name: 'Ilya Varlamov',
    youtubeUrl: 'https://www.youtube.com/c/ivarlamov',
  },
  {
    id: 2,
    name: 'Ulbi TV',
    youtubeUrl: 'https://www.youtube.com/c/UlbiTV',
  }
]

let posts:IPost[] = [
  {
    id: Math.floor(Math.random() * 100),
    bloggerId: 1,
    bloggerName: 'Ilya Varlamov',
    title: 'Где велодорожки?',
    shortDescription: 'Где велодорожки?',
    content: 'Lorem ipsum dolor sit amet, conse ed do eiusmod tempor incididunt ut labore et dolorliqua. Ut enim ad minim veniam',
  },
  {
    id: Math.floor(Math.random() * 100),
    bloggerId: 1,
    bloggerName: 'Ilya Varlamov',
    title: 'Почему трамвай еле ползёт?',
    shortDescription: 'Почему трамвай еле ползёт?',
    content: 'У нас народ любит порассуждать на тему трамваев, которые еле ползут, дребезжат, да ещё и ходят раз в час. То ли дело' +
    ' быстрые юркие маршруточки, которые могут и устроить гонку на ПАЗиках с конкурирующим частником, и пробку по двору объехать!',
  },
  {

    id: Math.floor(Math.random() * 100),
    bloggerId: 2,
    bloggerName: 'Ulbi TV',
    title: 'Техническое собеседование на full-stack dev',
    shortDescription: 'Техническое собеседование text text text',
    content: 'Техническое собеседование text text text',

  },
  {

    id: Math.floor(Math.random() * 100),
    bloggerId: 2,
    bloggerName: 'Ulbi TV',
    title: 'Как успешно пройти собеседование',
    shortDescription: 'Как успешно пройти собеседование',
    content: 'Постарайтесь найти всю доступную информацию о деятельности компании, ' +
     'ее корпоративной политике и требованиях к персоналу. Это поможет вам правильно' +
     ' вести себя во время интервью. Приготовьте также вопросы к интервьюерам. Эти вопросы могут' +
     ' касаться деятельности компании в целом (но только в том случае, если компания небольшая и информацию о ней действительно сложно найти),',
  }
]

//BLOGGER REQUESTS
router.get('/bloggers', (req: Request, res: Response) => {
  res.send(bloggers)
})

router.get('/bloggers/:id', (req: Request, res: Response)=> {
  const id = req.params.id;
  const blogger = bloggers.find((blogger)=> blogger.id === +id);
  if(!blogger){
    res.status(404).send({message: 'Blogger not found'})
  }
  res.status(201).send(blogger)
})

router.post('/bloggers', (req: Request, res: Response)=> {
  if(req.body.name || req.body.youtubeUrl){
    res.status(400).send('Provide all required parameters')
  }

  const newBlogger:IBlogger = {
    id: Math.floor(Math.random() * 100),
    name: req.body.name,
    youtubeUrl: req.body.youtubeUrl,
  }

  bloggers.push(newBlogger)
  res.status(201).send(newBlogger)
})

router.put('/bloggers/:id', (req: Request, res: Response)=> {
  const id = req.params.id;
  const blogger = bloggers.find(blogger=> blogger.id === +id)
  if(!blogger){
    res.status(400).send({message: 'Not found'})
  }
  const {name, youtubeUrl} = req.body;
   bloggers = bloggers.map((blogger)=> {
     if(blogger.id === +id){
       return {...blogger, name, youtubeUrl}
     }
     return blogger;
   })

  res.status(201).send({...blogger, name,youtubeUrl})
 })

router.delete('/bloggers/:id', (req: Request, res: Response)=> {
  const id = req.params.id;
  const blogger = bloggers.find(blogger=> blogger.id === +id)
  if(!blogger){
    res.status(400).send({message: 'Not found'})
  }
  bloggers = bloggers.filter((blogger)=> blogger.id !== +id)
  res.status(200).send(blogger)
})


//POSTS
router.get('/posts', (req: Request, res: Response)=> {
  res.send(posts)
})

router.post('/posts', (req: Request, res: Response)=> {
  const {bloggerId, title, shortDescription, content} = req.body;

  if(!bloggerId || !title || !shortDescription || !content) {
    res.status(400).send({message: 'Provide all required parameters'})
  }
  const bloggerPost = posts.find((bp)=> bp.bloggerId === bloggerId)
  if(!bloggerPost) {
    res.status(400).send({message: 'Invalid bloggerId: such blogger does`t exist'})
  }
  const newPost:IPost = {
    id: Math.floor(Math.random() * 100),
    title,
    bloggerId,
    shortDescription,
    content,
    bloggerName: bloggerPost?.bloggerName || 'Unknown',
  }
  posts.push(newPost)
  res.status(200).send(newPost)
})

router.get('/posts/:id', (req: Request, res: Response)=> {
  const id = req.params.id;
  let post  = posts.find((p)=> p.id === +id)
  if(!post){
    res.status(404).send({message: 'Post not found'})
  }
   res.status(200).send(post)

})

router.put('/posts/:id',(req: Request, res: Response)=> {
  const id = req.params.id;
  const {bloggerId, title, shortDescription, content} = req.body;
  if(!bloggerId || !title || !shortDescription || !content){
     res.status(400).send({message: 'Provide all parameters'})
  }
  const post = posts.find((p)=> p.id === +id);
  if(!post){
    res.status(404).send({message: 'Post with such ID does`t exist'})
  }
  const postByBloggerId = bloggers.find((b)=> b.id === bloggerId)

  if(!postByBloggerId){
    res.status(400).send({message: 'Blogger with such ID does`t exist'})
  }

  let updatedPost  = posts.find((p)=> {
    if(p.id === +id){
      return {...p, title, shortDescription, content, bloggerId, bloggerName: postByBloggerId?.name || 'Unknown'}
    }
  })
  res.status(200).send(updatedPost)
})

router.delete('/posts/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const deletePost = posts.find((p)=> p.id === + id);
  if(!deletePost){
    res.status(404).send({message: 'No post with such ID'})
  }
  posts = posts.filter((p)=> p.id !== +id)
  res.status(200).send(deletePost)
} )
