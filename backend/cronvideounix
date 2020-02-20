#!/bin/bash
FILES=/home/grupo3/Grupo03/backend/resources/unprocessed/*
cd /home/grupo3/Grupo03/backend/resources/unprocessed/

UPLOAD="resources/upload/"
UNPROCESSED="resources/unprocessed/"
CONVERTED="resources/converted/"

for FILE in $(basename $FILES)
do
    echo $FILE
    TMP="$(echo $FILE | sed 's/\.[^.]*$//')"
    ffmpeg -i $FILE -vcodec h264 -acodec aac -strict -2 ../converted/$TMP.mp4
    mysql -h localhost -uproyecto1 -proot_password -e "UPDATE proyecto1.Videos SET isConverted=1 WHERE originalPath='$UNPROCESSED$FILE';UPDATE proyecto1.Videos SET convertedPath='$CONVERTED$TMP.mp4' WHERE originalPath='$UNPROCESSED$FILE';UPDATE proyecto1.Videos SET originalPath='$UPLOAD$FILE' WHERE originalPath='$UNPROCESSED$FILE'"
    EMAIL=$(mysql -h localhost -uroot -ph3lpUsJ3sus\!20 -s -N -e "SELECT email FROM proyecto1.Videos WHERE convertedPath='$CONVERTED$TMP.mp4'");
    echo "Tu video ha sido procesado y publicado en la página del concurso." | mail -s "Video publicado" $EMAIL
    mv $FILE ../upload/$FILE
done
