## Initialization

```
docker run --rm -it -w /build -v $PWD:/build -p 8080:8080 node:dubnium npm install
```

Copy config.default.json to config.json and set SLACK_SECRET of your Slack bot

## Local Debug

```
docker run --rm -it -w /build -v $PWD:/build -p 8080:8080 node:dubnium npm start
```
```
curl -X POST -d '[DATA]' 'http://localhost:8080?channel=%23alerts&username=zabbix'
curl -X POST -H 'Content-Type: application/json' -d '{"data":"data"}' 'http://localhost:8080?channel=%23alerts&username=zabbix'
```

## Deploy

```
docker run -ti --mount type=bind,source="$(pwd)"/.config,target=/root/.config google/cloud-sdk:latest gcloud init
```
```
docker run -ti --mount type=bind,source="$(pwd)"/.config,target=/root/.config -w /root -v $PWD:/root google/cloud-sdk:latest gcloud functions deploy [FUNCTION_NAME] --runtime nodejs10 --trigger-http --entry-point handler --project mailgun-to-slack --service-account [SERVICE_ACCOUNT] --allow-unauthenticated
```
