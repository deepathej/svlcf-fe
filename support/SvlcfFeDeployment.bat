cd ..
docker stop svlcffe
docker rm svlcffe
docker rmi svlcffe
timeout /t 2
docker build -t svlcffe .
timeout /t 5
docker run --network svlcf-net --name svlcffe -e TZ=Asia/Kolkata -p 9000:9000 -v C:\Data\OneDrive:/home/Data -d svlcffe:latest
timeout /t 10
cd C:/Data/Code/svlcf-be
call mvn clean install
timeout /t 2
cd support
start cmd.exe /c "SvlcfBeDeployment.bat"
