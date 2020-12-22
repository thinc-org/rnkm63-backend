# rnkm63-backend

# To setup docker containers:

1. Run `docker-compose up`. All services should be up and running except InfluxDB.
2. To finish setting up InfluxDB, Open your browser and go to `http://localhost:8086`.
3. Enter your username and password.
4. For `Initial Organizaion Name`, enter `rnkm63`
5. For `Initial Bucket Name`, enter `rnkm63-logs`
6. Choose `Quick Start`.
7. In the dashboard, select `Load data -> Tokens`
8. Copy your token and put it in `INFLUXDB_TOKEN` key in `.env`
9. InfluxDB should now be ready.
