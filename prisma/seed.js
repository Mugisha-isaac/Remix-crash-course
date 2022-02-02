const {PrismaClient}  = require('@prisma/client');
const db = new PrismaClient();



async function seed(){
    await Promise.all(
        getPosts.map(post=>{
            return db.post.create({data:post});
        })
    )
}

seed();


function getPosts(){
    return [
        {
            title:'javascript',
            body:'Dealing with code reusability and readability'
        },
        {
            title:'Typescript',
            body:'Emphasising on typs'
        },
        {
            title:'java',
            body:'Dealing with classes and objects'
        },
        {
            title:'Reactjs',
            body:'Best javascript frame work so far'
        }
    ]
}