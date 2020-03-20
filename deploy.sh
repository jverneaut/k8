#!/bin/sh

TAG=jverneaut/k8:$(git rev-parse HEAD)

docker build -t $TAG .
docker push $TAG

sed -i '' -e 's|jverneaut/k8.*|'${TAG}'|g' ./kube/k8.yml
kubectl apply -f kube

git add kube/k8.yml
git commit -m "Add sha"
