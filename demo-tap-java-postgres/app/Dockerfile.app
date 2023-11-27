# Use a base image with Java for compilation
FROM openjdk:17-jdk-slim
# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container at /app
COPY Main.java /app
COPY java-client-1.0-SNAPSHOT.jar /app
COPY postgresql-42.6.0.jar /app

# Compile the Java code
RUN javac -cp /app/java-client-1.0-SNAPSHOT.jar:postgresql-42.6.0.jar Main.java

# Use a smaller base image for running the application
# Specify the command to run on container startup
CMD [ \
  "java", \
  "-cp", \
  "/app/java-client-1.0-SNAPSHOT.jar:postgresql-42.6.0.jar:.", \
  "Main" \
]
