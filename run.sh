while :
do
	npm install
	git pull
	node generate_commands.js
	node index.js
done
