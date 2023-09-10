FROM openjdk:17-jdk-slim
LABEL authors="craig"

WORKDIR /demo/target

COPY target/demo-0.0.1-SNAPSHOT.jar /demo/target/demo-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/demo/target/demo-0.0.1-SNAPSHOT.jar"]