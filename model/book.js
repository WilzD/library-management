const Sequelize=require('sequelize')
const sequelize=require('../path/database')

const Book=sequelize.define('book',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    bookName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    
})