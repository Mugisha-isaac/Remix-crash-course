const {PrismaClient}  = require('@prisma/client');
const prisma = new PrismaClient();



async function seed(){
    // password: hashcat 
    const Isaac = await prisma.user.create({
        data:{
        username: 'Isaac',
        passwordHash:'$P$984478476IagS59wHZvyQMArzfx58u'
        }
    })
    await Promise.all(
        getPosts().map(post=>{
            const data = {userId:Isaac.id,...post}
            return prisma.post.create({data});
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