# BijoyToUnicode
Mass convert bijoy ascii text to unicode bangla text

### Database Config
Rename the `example.env` to `.env` and update the configurations there.

### Configure the javascript code to generate the sql script
In `index.js` find the `run` function and inside it call `generateSql('table', 'column')` function.

```javascript
run(async ()=>{
	await generateSql('table_name_A', 'column_name_1_containing_bijoy_ascii_text')
  	await generateSql('table_name_B', 'column_name_2_containing_bijoy_ascii_text')
	await generateSql('table_name_C', 'column_name_2_containing_bijoy_ascii_text')	
})
```

### Sql script generation

After completing the steps above run the following commands
```bash
$ npm install
$ node index.js
OR
$ npm run dev
```

After successful installation of dependencies and run it will generate the `.sql` files inside the `sql` directory
