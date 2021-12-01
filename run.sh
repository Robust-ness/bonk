while :
do
	git pull
	node generate_commands.js
	node index.js
done
