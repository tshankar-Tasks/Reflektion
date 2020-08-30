const chai = require('chai')
const supertest = require('supertest')
const server = supertest.agent('https://jsonplaceholder.typicode.com')

describe('Task : API Testing',() =>{

    //Test Getservice
    describe("Testing Get service : " , () => {

        it('Task 1 = Verify Get service for /post URI' , () => {

            server
            .get('/posts')
            .expect(200) // Verify the response status code
            .end(function(err,res){
                if(!err){
                    // verify the schema
                    var data = (res.body)
                    data.forEach((item)=>{
                        chai.expect(item).to.have.all.keys('userId','id','title','body')
                    }) 
                    // verify that API returns at least 100 records 
                    chai.expect(res.body).to.have.length.least(100)
                }
                else
                {
                    console.log(err)
                }
            })
        })

        it('Task 2 = Verify Get service for /post/1 URI' , () => {

            server
            .get('/posts/1')
            .expect(200) // verify that status code is 200
            .end(function(err,res){
                if(!err){
                    // verify the schema
                    chai.expect(res.body).to.have.all.keys('userId','id','title','body') 
                    // verify that id in response matches the input (1) 
                    chai.expect(res.body).to.have.property('id',1)
                }
                else
                {
                    console.log(err)
                }
            })
        }) 

        it('Task 3 = Verify Get service for /invalidposts URI' , () => {

            server
            .get('/invalidposts')
            .expect(404) // verify that status code is 404
            .end(function(err,res){
                if(!err){

                    //Log request and response
                        console.log('request param : ' + JSON.stringify(server.get('invalidposts'),null,2))
                        console.log('response param : ' + res.body)
                }
            })
        })
        
    })

    describe("Testing Post service : " , () => {
        it('Task 1 = Verify Post service for /post URI' , () => {

            server
            .post('/posts')
            .set('content-type','application/json')
            .send({
                "title": 'abc',
                "body": 'xyz',
                "userId":'1',
            })
            .expect(201) // Verify the response status code = 201
            .end(function(err,res){
                if(!err){
                    // verify the schema & verify the record created 
                    chai.expect(res.body).to.have.all.keys('userId','id','title','body')
                    chai.expect(res.body).to.have.property("title", 'abc')
                    chai.expect(res.body).to.have.property("body", 'xyz')
                    chai.expect(res.body).to.have.property("userId",'1')
                }
                else
                {
                    console.log(err)
                }
            })
        })

    })

    describe("Testing Put service : " , () => {
        it('Task 1 = Verify Put service for /posts/1 URI' , () => {

            server
            .put('/posts/1')
            .set('content-type','application/json')
            .send({
                "id":1,
                "title": 'abc',
                "body": 'xyz',
                "userId":'1',
            })
            .expect(200) // Verify the response status code = 200
            .end(function(err,res){
                if(!err){
                    // verify the schema & verify the record created 
                    chai.expect(res.body).to.have.all.keys('userId','id','title','body')
                    chai.expect(res.body).to.have.property("title", 'abc')
                    chai.expect(res.body).to.have.property("body", 'xyz')
                    chai.expect(res.body).to.have.property("userId",'1')
                    chai.expect(res.body).to.have.property("id",1)
                }
                else
                {
                    console.log(err)
                }
            })
        })

    })

    describe("Testing Delete service : " , () => {
        it('Task 1 = Verify Delete service for /posts/1 URI' , () => {

            server
            .delete('/posts/1')
            .expect(200) // Verify the response status code = 200
            .end(function(err,res){
                if(!err){
                    //log respose
                    chai.expect(res.body).to.be.empty
                }
                else
                {
                    console.log(err)
                }
            })
        })

    })
})