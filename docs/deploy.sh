#! /bin/bash

SCRIPT=$(readlink -f $0)
BASE_DIR=$(dirname $SCRIPT)

kubectl apply -f "$BASE_DIR/deploy.yml"

uiPort=$(kubectl get service vk-web -o jsonpath={.spec.ports[0].nodePort})
minikubeIp=$(minikube ip)
echo "The web ui is listening on http://$minikubeIp:${uiPort}"


