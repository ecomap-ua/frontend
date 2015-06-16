# Kv-008.frontend

this script assumes you have npm, node, bower and mysql installed
```sudo apt-get install nodejs npm```
and then
```sudo npm install -g bower```
```sudo apt-get install mysql```
mysql creds:
  user: root
  password: root

Before launching the script you may need to enter:
  ```git config --global url."https://".insteadOf git://```


Then create deploy.sh script with the next contents:
```
mkdir -p /var/tmp/deploy/
cd /var/tmp/deploy/
rm -rf KV004/
git clone https://github.com/ITsvetkoFF/KV004.git
cd KV004/frontend/
npm install
npm install -g grunt-cli
bower install --allow-root
grunt distOn
grunt
cd ../backend
npm install
mysql -u root -proot < EnviromapDB.sql
nodejs filldb.js
```
and then run
```sudo sh deploy.sh```

then you can run ecomap typing
```nodejs api.js```
in the /var/tmp/deploy/KV004/backend/ folder
