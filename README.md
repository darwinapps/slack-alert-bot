
```
docker run --rm -it -w /build -v $PWD:/build -p 8080:8080 node:dubnium npm start
```

```
docker run -ti --mount type=bind,source="$(pwd)"/.config,target=/root/.config google/cloud-sdk:latest gcloud init
docker run -ti --mount type=bind,source="$(pwd)"/.config,target=/root/.config -w /root -v $PWD:/root google/cloud-sdk:latest gcloud functions deploy mailgun-slack --runtime nodejs10 --trigger-http --entry-point handler --project mailgun-to-slack --service-account mailgun@mailgun-to-slack.iam.gserviceaccount.com
```
