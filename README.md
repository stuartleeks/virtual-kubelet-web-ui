# Virtual Kubelet Web UI
This project is a sample Web UI over  APIs for the [Virtual Kubelet](https://github.com/virtual-kubelet/virtual-kubelet) web provider.



```
                                                                  +------------------------------+
                                                                  |                              |
                                                                  | VK Web UI (this project)     |
                                                                  |                              |
                                                                  +-------------+----------------+
                                                                                |
                                                                                | HTTP
                                                                                |
+----------------+         +---------------------------+          +-------------v----------------+
|                |         |                           |   HTTP   |                              |
|   Kubernetes   | <-----> |   Virtual Kubelet: Web    | <------> |   Web provier API            |
|                |         |                           |          |                              |
+----------------+         +---------------------------+          +------------------------------+
```

## Running the UI via docker

To run the Mock API via docker run

```bash
docker run -p 8080:80 stuartleeks/vk-web-ui
```

This will expose the API on http://localhost:8080.


At the top of the UI you can specify the API address (it defaults to http://localhost:5000)

## Running the UI locally

If you want to run the UI locally then clone the repo and make you you have `npm` installed. Then run `npm start` from the repor root folder.

## Screenshot
![sample ui](docs/ui.jpeg)
