cd ..
timeout /t 2
docker stop svlcffe
docker rm svlcffe
docker rmi svlcffe
timeout /t 2
docker build -t svlcffe .
timeout /t 5
docker run --network svlcf-net --name svlcffe -e TZ=Asia/Kolkata -p 9002:9002 -v C:\Data\OneDrive:/home/Data -d svlcffe:latest
timeout /t 25
cd C:/Data/Code/svlcfbe
call mvn clean install
timeout /t 2
cd support
start cmd.exe /c "SvlcfBeDeployment.bat"