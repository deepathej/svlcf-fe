FROM eclipse-temurin:17
LABEL maintainer="mukundathej@gmail.com"
COPY target/svlcffe.jar svlcffe.jar
ENTRYPOINT ["java", "-jar", "svlcffe.jar", "--spring.profiles.active=docker"]