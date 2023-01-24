const { Pool, Client } = require('pg')
const fs = require('fs/promises');
const {ConvertToUnicode, IsAscii} = require('./bijoy2uni')
require('dotenv').config();

const client = new Pool({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 2  
});

function fetchAllDistinct(table, column){
	const sql = `SELECT DISTINCT ${column} FROM ${table} WHERE ${column} IS NOT NULL`
	return client.query(sql)
}

function saveRow(table, column, ascii, unicode){
	return `UPDATE ${table} SET ${column}='${unicode}' WHERE ${column}='${ascii}';\n`
}

async function generateSql(table, column){
	const res = await fetchAllDistinct(table, column)
	let sql  = '';
	res.rows.forEach(r => {
		if(!IsAscii(r[column])){
			return
		}

		sql += saveRow(table, column, r[column], ConvertToUnicode('bijoy', r[column].trim()))				
	})
	
	console.log(sql)
	await fs.writeFile(`./sql/${table}_${column}.sql`, sql);
}

async function run(callback){
	try{
		await callback()	
		await client.end()		
	}catch(err){
		console.log(err)
	}
}


run(async ()=>{
	//////////////////////////////
	// add your code below here //
	//////////////////////////////
	await generateSql('raw_data.astructure', 'address')	
})
