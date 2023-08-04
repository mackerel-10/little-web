#!/bin/bash
# MySQL 설정
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER '${MYSQL_USER_NAME}'@'%' IDENTIFIED BY '${MYSQL_USER_PASSWORD}';
"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER_NAME}'@'%' WITH GRANT OPTION;"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "flush privileges;"


